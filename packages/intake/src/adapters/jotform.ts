import { APIGatewayProxyEvent } from 'aws-lambda';
import { Maybe } from 'true-myth';
import * as z from 'zod';
import { IntakeAdapter } from '../adapter';

const jotformSubmissionSchema = z.object({
    formID: z.string(),
    submissionID: z.string(),
    webhookURL: z.string(),
    ip: z.string(),
    formTitle: z.string(),
    username: z.string(),
    rawRequest: z.union([z.record(z.unknown()), z.string()]),
    type: z.string(),
    pretty: z.string(),
});

type JotFormSubmission = z.infer<typeof jotformSubmissionSchema>;

/**
 * Used to extract multi-part form boundaries from JotForm submissions.
 * @see https://stackoverflow.com/a/20321259 for explanation of multi-part form boundaries
 * @param event
 * @returns
 */
export const extractBoundary = (event: APIGatewayProxyEvent): Maybe<string> => {
    const headers = event.headers;
    if (!headers['Content-Type']) return Maybe.nothing();
    const [, boundary] = headers['Content-Type'].split('=');
    return Maybe.fromNullable(boundary);
};

/**
 *
 * @param contentSegment
 * @returns
 */
export const extractContentDispositionName = (contentSegment: string): Maybe<string> => {
    const CONTENT_DISPOSITION_REGEX = new RegExp(/"(.+)"$/m);
    const result = CONTENT_DISPOSITION_REGEX.exec(contentSegment);
    if (!result) return Maybe.nothing();
    const [, capture] = result;
    return Maybe.fromNullable(capture);
};

/**
 * Used in conjuction with extractFormSubmission to compose a jotform form submission
 * @private
 * @param accumulator
 * @param formSegment
 */
function segmentReducer(accumulator: Record<string, unknown>, formSegment: string): Record<string, unknown> {
    const NEW_LINE_OR_QUOTE = /[\n"]/;
    const segmentName = extractContentDispositionName(formSegment).unwrapOr('');
    if (!segmentName.trim()) return accumulator;
    if (segmentName === 'rawRequest') {
        let [, segmentValue] = formSegment.split(segmentName);
        accumulator[segmentName] = JSON.parse(segmentValue.replace(NEW_LINE_OR_QUOTE, '').trim());
        return accumulator;
    }
    let [, segmentValue] = formSegment.split(segmentName);
    accumulator[segmentName] = segmentValue.replace(NEW_LINE_OR_QUOTE, '').trim();
    return accumulator;
}

export const extractFormSubmission = (event: APIGatewayProxyEvent & { body: string }): Maybe<JotFormSubmission> => {
    const maybeBoundary = extractBoundary(event);
    return (
        maybeBoundary
            // extract boundary and filter empty formSegments
            .map((boundary) => {
                return event.body.split('--' + boundary).filter((s) => s !== '');
            })
            // reduce form segments into record format
            .map((formSegments) => {
                return formSegments.reduce(segmentReducer, {});
            })
            // attempt to parse collected segments into jotformSubmission
            .flatMap((data) => {
                try {
                    const submission = jotformSubmissionSchema.parse(data);
                    return Maybe.just(submission);
                } catch (error) {
                    console.log(error);
                    return new Maybe.Nothing();
                }
            })
    );
};

/**
 *
 */
export const JotFormUserSubmissionAdapter: IntakeAdapter = {
    async parseSubmission(event) {
        if (event.body === null) return Maybe.nothing();
        return extractFormSubmission(event as APIGatewayProxyEvent & { body: string });
    },
};
