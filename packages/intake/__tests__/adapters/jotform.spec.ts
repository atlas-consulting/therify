import { APIGatewayProxyEvent } from 'aws-lambda';
import { createMock } from 'ts-auto-mock';
import { extractBoundary, extractContentDispositionName, extractFormSubmission } from '../../src/adapters/jotform';
import userFormSubmission from '../../__mocks__/data/userFormSubmission.json';

describe('JotForm Intake Adapter', () => {
    describe('Parsing submissions', () => {
        describe('extracting multi-part form boundaries', () => {
            const testEvent = createMock<APIGatewayProxyEvent>();
            test('extracting a boundary from an event', () => {
                testEvent.headers['Content-Type'] =
                    'multipart/form-data; boundary=------------------------13bd912e74fa1748';
                expect(extractBoundary(testEvent).unwrapOr(undefined)).toBeDefined();
            });
            test('failing to extract a boundary results in Nothing', () => {
                testEvent.headers = {};
                expect(extractBoundary(testEvent).isNothing()).toBeTruthy();
            });
            test('extracted boundary is a Maybe type', () => {
                testEvent.headers['Content-Type'] =
                    'multipart/form-data; boundary=------------------------13bd912e74fa1748';
                const boundary = extractBoundary(testEvent);
                expect(boundary.isJust()).toBeTruthy(); // Successfully parsed
                expect(boundary.isNothing()).toBeFalsy(); // Unsuccessfully parsed
                expect(boundary.unwrapOr(undefined)).toBeDefined(); // Extracting value from Maybe
            });
        });
        describe('extracting content-disposition name', () => {
            test('extracting disposition from a form-segment', () => {
                const sampleSegment = `            
      Content-Disposition: form-data; name="username"
    
      TheraFund
       `;
                expect(extractContentDispositionName(sampleSegment).unsafelyUnwrap()).toBe('username');
            });
        });
        describe('parsing Submissions from APIGatewayEvents', () => {
            test('extractFormSubmission', () => {
                const mockEvent = createMock<APIGatewayProxyEvent>();
                const testEvent: APIGatewayProxyEvent & { body: string } = {
                    ...mockEvent,
                    body: userFormSubmission.body,
                    headers: userFormSubmission.headers,
                };
                expect(extractFormSubmission(testEvent).unwrapOr({})).toMatchObject({
                    formID: expect.any(String),
                    submissionID: expect.any(String),
                    webhookURL: expect.any(String),
                    ip: expect.any(String),
                    formTitle: expect.any(String),
                    username: expect.any(String),
                    rawRequest: expect.any(Object),
                    type: expect.any(String),
                });
            });
            test("results in Nothing when header boundary can't be extracted", () => {
                const mockEvent = createMock<APIGatewayProxyEvent>();
                const testEvent: APIGatewayProxyEvent & { body: string } = {
                    ...mockEvent,
                    body: userFormSubmission.body,
                };
                expect(extractFormSubmission(testEvent).isNothing()).toBeTruthy();
            });

            test("results in Nothing when can't parse event body", () => {
                const mockEvent = createMock<APIGatewayProxyEvent>();
                const testEvent: APIGatewayProxyEvent & { body: string } = {
                    ...mockEvent,
                    headers: userFormSubmission.headers,
                    body: '',
                };
                expect(() => extractFormSubmission(testEvent).isNothing()).toBeTruthy();
            });
        });
    });
});
