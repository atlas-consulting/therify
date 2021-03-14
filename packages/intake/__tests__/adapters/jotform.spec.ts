import { APIGatewayProxyEvent } from 'aws-lambda';
import { createMock } from 'ts-auto-mock';
import { extractBoundary, extractContentDispositionName } from '../../src/adapters/jotform';

describe('JotForm Intake Adapter', () => {
    describe('Parsing submissions', () => {
        describe('extracting multi-part form boundaries', () => {
            const testEvent = createMock<APIGatewayProxyEvent>();
            test('extracting a boundary from an event', () => {
                testEvent.headers['Content-Type'] =
                    'multipart/form-data; boundary=------------------------13bd912e74fa1748';
                expect(extractBoundary(testEvent).unwrapOr(undefined)).toBeDefined();
            });
            test('failing to extract a boundary results in an error', () => {
                testEvent.headers = {};
                expect(() => extractBoundary(testEvent)).toThrow();
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
        describe('Extracting content-disposition name', () => {
            test('extracting disposition from a form-segment', () => {
                const sampleSegment = `            
      Content-Disposition: form-data; name="username"
    
      TheraFund
       `;
                expect(extractContentDispositionName(sampleSegment).unsafelyUnwrap()).toBe('username');
            });
        });
    });
});
