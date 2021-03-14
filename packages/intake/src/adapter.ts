import { APIGatewayProxyEvent } from 'aws-lambda';
import { Maybe } from 'true-myth';
import {Intake} from '@therify/types'

export interface IntakeAdapter {
    parseSubmission(event: APIGatewayProxyEvent): Promise<Maybe<Intake.IntakeSubmission>>;
}
