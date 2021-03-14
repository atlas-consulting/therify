import { S3 } from 'aws-sdk';
import { Intake } from '@therify/types';
import { getConfig } from './configuration';
/**
 *
 */
export async function persistSubmission(subject: Intake.IntakeSubject, submission: Intake.IntakeSubmission) {
    const s3 = new S3();
    const config = getConfig();
    const result = await s3
        .putObject({
            Bucket: config.CLIENT_INTAKE_BUCKET_NAME,
            Key: `${submission.formID}/${submission.submissionID}`,
            Body: submission.rawRequest,
        })
        .promise();
    return result;
}
