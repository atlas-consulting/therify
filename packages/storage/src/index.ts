import { S3 } from 'aws-sdk';
import { Intake } from '@therify/types';
import { getConfig } from './configuration';

const PERSIST_SUBMISSION_SUCCESS = 'SUCCESS';
const PERSIST_SUBMISSION_FAILURE = 'FAILURE';
const PERSIST_SUBMISSION_RESULT_TYPES = [PERSIST_SUBMISSION_SUCCESS, PERSIST_SUBMISSION_FAILURE] as const;
export type PersistSubmissionResultType = typeof PERSIST_SUBMISSION_RESULT_TYPES[number];
interface PersistSubmissionSuccess {
    type: typeof PERSIST_SUBMISSION_SUCCESS;
    bucketId: string;
    key: string;
}

interface PersistSubmissionError {
    type: typeof PERSIST_SUBMISSION_FAILURE;
    rawMessage: string | Record<string, unknown>;
}

export type PersistSubmissionResult = PersistSubmissionSuccess | PersistSubmissionError;

/**
 *
 */
export async function persistSubmission(
    subject: Intake.IntakeSubject,
    submission: Intake.IntakeSubmission,
): Promise<PersistSubmissionResult> {
    const s3 = new S3();
    const config = getConfig();
    const bucketId: string = config.CLIENT_INTAKE_BUCKET_NAME;
    const key = `${submission.formID}/${submission.submissionID}`;
    try {
        await s3
            .putObject({
                Bucket: bucketId,
                Key: key,
                Body: submission.rawRequest,
            })
            .promise();
        return {
            type: 'SUCCESS',
            bucketId,
            key,
        };
    } catch (persistError) {
        return {
            type: 'FAILURE',
            rawMessage: submission.rawRequest,
        };
    }
}
