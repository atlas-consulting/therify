/**
 * @module Therify::Types::Intake
 * @description Global types related to user and provider intake
 */

const INTAKE_SUBJECT_USER = 'USER';
const INTAKE_SUBJECT_PROVIDER = 'PROVIDER';
const INTAKE_SUBJECTS = [INTAKE_SUBJECT_USER, INTAKE_SUBJECT_PROVIDER] as const;
export type IntakeSubject = typeof INTAKE_SUBJECTS[number];

/**
 * Submission intake can result in one of two states, "success" or "error".
 * If intake is "successful" we proceed to the next stage of the Therify matching-pipeline.
 * If intake resulted in an "error", we persist the raw submission in a queue for attempted reprocessing.
 */
export const INTAKE_STATUS_SUCCESS = 'INTAKE_SUCCESS';
export const INTAKE_STATUS_ERROR = 'INTAKE_ERROR';
export const INTAKE_STATUSES = [INTAKE_STATUS_SUCCESS, INTAKE_STATUS_ERROR] as const;
export type IntakeStatus = typeof INTAKE_STATUSES[number];

/**
 * Intake results are persisted to s3, here we return the resulting bucketId and key.
 */
export interface IntakeResultSuccess {
    status: typeof INTAKE_STATUS_SUCCESS;
    subject: IntakeSubject;
    bucketId: string;
    key: string;
}
/**
 * In case of error, we pass the raw-message for further processing.
 */
export interface IntakeResultError {
    status: typeof INTAKE_STATUS_ERROR;
    subject: IntakeSubject;
    rawMessage: string;
}

export type IntakeResult = IntakeResultSuccess | IntakeResultError;
