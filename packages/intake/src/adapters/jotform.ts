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
 */
export const JotFormUserSubmissionAdapter: IntakeAdapter = {
    async parseSubmission(event) {
        return {};
    },
};
