import { APIGatewayProxyEvent } from 'aws-lambda';
import { Maybe } from 'true-myth';
import { IntakeAdapter } from '../adapter';
import { ExtractBoundaryError } from '../errors';

/**
 * Used to extract multi-part form boundaries from JotForm submissions.
 * @see https://stackoverflow.com/a/20321259 for explanation of multi-part form boundaries
 * @param event
 * @returns
 */
export const extractBoundary = (event: APIGatewayProxyEvent): Maybe<string> => {
    const headers = event.headers;
    if (!headers['Content-Type']) throw new ExtractBoundaryError();
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
    if (!result) throw new Error();
    const [, capture] = result;
    return Maybe.fromNullable(capture);
};

/**
 *
 */
export const JotFormUserSubmissionAdapter: IntakeAdapter = {
    async parseSubmission(event) {
        return {};
    },
};
