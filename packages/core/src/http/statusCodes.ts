export const OK = 200;
export const BAD_REQUEST = 400;
export const INTERNAL_SERVER_ERROR = 500;
export const STATUS_CODES = [OK, BAD_REQUEST, INTERNAL_SERVER_ERROR] as const;
export type StatusCode = typeof STATUS_CODES[number];

const statusCodeToMessage: Record<StatusCode, string> = {
    [OK]: 'Ok',
    [BAD_REQUEST]: 'Bad Request',
    [INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

export const getStatusMessage = (statusCode: StatusCode): string => statusCodeToMessage[statusCode];
export enum statusCodes {
    OK = 200,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
}
