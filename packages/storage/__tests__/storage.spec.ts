import AWSMock from 'aws-sdk-mock';
import { createMock } from 'ts-auto-mock';
import { Intake } from '@therify/types';
import { persistSubmission } from '../src';

// AWSMock.setSDKInstance(AWS);

describe('Therify Storage', () => {
    describe('Intake Form Storage', () => {
        beforeAll(async (done) => {
            process.env.AWS_REGION = 'us-east-1';
            process.env.STAGE = 'development';
            process.env.APPLICATION_NAME = 'therify';
            process.env.CLIENT_INTAKE_BUCKET_NAME = 'test';
            done();
        });
        test('bucket names are environment specific', () => {
            const putObjectSpy = jest.fn();
            const mockSubmission = createMock<Intake.IntakeSubmission>();
            AWSMock.mock('S3', 'putObject', putObjectSpy);
            persistSubmission('USER', mockSubmission);
            putObjectSpy.mockName('s3PutObjectMock');
            expect(putObjectSpy).toHaveBeenCalled();
        });
    });
});
