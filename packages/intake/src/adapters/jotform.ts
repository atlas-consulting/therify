import { APIGatewayProxyEvent } from 'aws-lambda';
import { Maybe } from 'true-myth';
import * as Yup from 'yup';
import { IntakeAdapter } from '../adapter';

const jotformSubmissionSchema = Yup.object({
    formID: Yup.string().defined(),
    submissionID: Yup.string().defined(),
    webhookURL: Yup.string().defined(),
    ip: Yup.string().defined(),
    formTitle: Yup.string().defined(),
    username: Yup.string().defined(),
    rawRequest: Yup.object().defined(),
    type: Yup.string().defined(),
});

type JotFormSubmission = Yup.Asserts<typeof jotformSubmissionSchema>;

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
                    const submission = jotformSubmissionSchema.validateSync(data);
                    return Maybe.just(submission);
                } catch (error) {
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
        return {};
    },
};
