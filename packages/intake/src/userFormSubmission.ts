import { APIGatewayProxyEvent } from 'aws-lambda';
import { Intake } from '@therify/types';
import * as storage from '@therify/storage';
import { IntakeAdapter } from './adapter';

/**
 * Given an APIProxyGatewayEvent containing a form submission, attempts
 * to partially parse the submission to store the submission for
 * further processing.
 *
 * @see "@therify/types.intake for more details"
 * @param event
 * @returns Intake.IntakeResult
 */
export async function userFormSubmission(
    event: APIGatewayProxyEvent,
    adapter: IntakeAdapter,
): Promise<Intake.IntakeResult> {
    const result = await adapter.parseSubmission(event);
    const submission = result.unsafelyUnwrap();
    const persistResult = await storage.persistSubmission('USER', submission);
    switch (persistResult.type) {
        case 'SUCCESS':
            return {
                subject: 'USER',
                bucketId: persistResult.bucketId,
                key: persistResult.key,
                status: 'INTAKE_SUCCESS',
            };
        case 'FAILURE':
            return {
                subject: 'USER',
                rawMessage: JSON.stringify(persistResult.rawMessage),
                status: 'INTAKE_ERROR',
            };
    }
}
