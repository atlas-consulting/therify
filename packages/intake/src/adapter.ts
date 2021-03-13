import { APIGatewayProxyEvent } from 'aws-lambda';

export interface IntakeAdapter {
    parseSubmission(event: APIGatewayProxyEvent): Promise<Record<string, unknown>>;
}
