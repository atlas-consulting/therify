import { APIGatewayProxyEvent } from 'aws-lambda';
import { Maybe } from 'true-myth';
interface IntakeSubmission {
    submissionID: string;
    rawRequest: Record<string, unknown>;
}
export interface IntakeAdapter {
    parseSubmission(event: APIGatewayProxyEvent): Promise<Maybe<IntakeSubmission>>;
}
