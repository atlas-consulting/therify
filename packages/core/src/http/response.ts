import { APIGatewayProxyResult } from 'aws-lambda';
import { getStatusMessage, StatusCode } from './statusCodes';

export interface Response {
    status: StatusCode;
    data: unknown;
    message: string;
    errors: string[];
}

export function generateResponse(
    statusCode: StatusCode,
    body?: unknown,
    message?: string,
    ...errors: string[]
): Response {
    if (!message) {
        return {
            status: statusCode,
            data: body,
            message: getStatusMessage(statusCode),
            errors: [],
        };
    }
    return {
        status: statusCode,
        data: body,
        message: message || getStatusMessage(statusCode),
        errors,
    };
}

export function generateProxyResponse(
    statusCode: StatusCode,
    body?: unknown,
    message?: string,
    ...errors: string[]
): APIGatewayProxyResult {
    if (!body) {
        return {
            statusCode,
            body: JSON.stringify(generateResponse(statusCode)),
        };
    }
    return {
        statusCode,
        body: JSON.stringify(generateResponse(statusCode, body, message, ...errors)),
    };
}
