import { APIGatewayProxyEvent } from 'aws-lambda';
import { createMock } from 'ts-auto-mock';
import * as intake from '../src';
import { JotFormUserSubmissionAdapter } from '../src/adapters/jotform';
import proxyEvent from '../data/userFormSubmission.json';
import * as storage from '@therify/storage';
import { IntakeAdapter } from '../src/adapter';
jest.mock('@therify/storage', () => ({
    persistSubmission: jest.fn(),
}));
describe('Intake of user form submissions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('dependencies', () => {
        const mockEvent = createMock<APIGatewayProxyEvent>();
        mockEvent['headers'] = proxyEvent['headers'];
        mockEvent['body'] = proxyEvent['body'];
        test('calls storage.persistSubmission', async () => {
            expect.assertions(1);
            expect.assertions(1);
            await intake.userFormSubmission(mockEvent, JotFormUserSubmissionAdapter);
            expect(storage.persistSubmission).toHaveBeenCalled();
        });
        test('utilizes the given adapters impl of parseSubmission', async () => {
            expect.assertions(1);
            const mockAdapter = createMock<IntakeAdapter>();
            mockAdapter.parseSubmission = jest.fn();
            await intake.userFormSubmission(mockEvent, mockAdapter);
            expect(mockAdapter.parseSubmission).toHaveBeenCalled();
        });
    });
    describe('failure scenarios', () => {
        const mockEvent = createMock<APIGatewayProxyEvent>();
        const failedIntake = {
            subject: 'USER',
            rawMessage: expect.anything(),
            status: 'INTAKE_ERROR',
        };
        test('a missing event body results in a failed intake', async () => {
            expect.assertions(1);
            expect(intake.userFormSubmission(mockEvent, JotFormUserSubmissionAdapter)).resolves.toMatchObject(
                failedIntake,
            );
        });
        test('a missing or malformed header results in a failed intake', async () => {
            expect.assertions(1);
            let mockEventWithBodyNoHeader = createMock<APIGatewayProxyEvent>();
            mockEventWithBodyNoHeader['body'] = proxyEvent['body'];
            expect(
                intake.userFormSubmission(mockEventWithBodyNoHeader, JotFormUserSubmissionAdapter),
            ).resolves.toMatchObject(failedIntake);
        });
        describe('failing to persist a submission', () => {
            const mockEvent = createMock<APIGatewayProxyEvent>();
            mockEvent['headers'] = proxyEvent['headers'];
            mockEvent['body'] = proxyEvent['body'];
            const failedIntake = {
                subject: 'USER',
                rawMessage: expect.anything(),
                status: 'INTAKE_ERROR',
            };

            test('results in an intake failure', () => {
                expect.assertions(1);
                (storage.persistSubmission as jest.Mock).mockReturnValue(
                    Promise.resolve({
                        type: 'FAILURE',
                        rawMessage: '',
                    }),
                );
                expect(intake.userFormSubmission(mockEvent, JotFormUserSubmissionAdapter)).resolves.toMatchObject(
                    failedIntake,
                );
            });
        });
    });
    describe('successful intake', () => {
        const mockEvent = createMock<APIGatewayProxyEvent>();
        mockEvent['headers'] = proxyEvent['headers'];
        mockEvent['body'] = proxyEvent['body'];
        test('results in an INTAKE_SUCESS with directions to the storage bucket', () => {
            expect.assertions(1);
            (storage.persistSubmission as jest.Mock).mockReturnValue(
                Promise.resolve({
                    type: 'SUCCESS',
                    bucketId: 'test',
                    key: '/path/to/submission',
                }),
            );
            expect(intake.userFormSubmission(mockEvent, JotFormUserSubmissionAdapter)).resolves.toMatchObject({
                subject: 'USER',
                bucketId: 'test',
                key: '/path/to/submission',
                status: 'INTAKE_SUCCESS',
            });
        });
    });
});
