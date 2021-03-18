import { generateResponse, statusCodes } from '../src/http';

describe('Therify Core HTTP', () => {
    describe('response utilities', () => {
        test('generating a standardized response msg with just a status code', () => {
            expect(generateResponse(statusCodes.OK)).toMatchObject({
                status: statusCodes.OK,
                message: 'Ok',
                data: undefined,
                errors: expect.any(Array),
            });
        });
        test('generating a standardized response with status code and response body', () => {
            expect(generateResponse(statusCodes.OK, { friends: ['Elmo'] })).toMatchObject({
                status: statusCodes.OK,
                message: 'Ok',
                data: {
                    friends: ['Elmo'],
                },
                errors: expect.any(Array),
            });
        });
        test('return a custom message and errors', () => {
            expect(
                generateResponse(
                    statusCodes.BAD_REQUEST,
                    null,
                    'Invalid Parameters',
                    'Missing userId',
                    'Missing tenantId',
                ),
            ).toMatchObject({
                status: statusCodes.BAD_REQUEST,
                data: null,
                message: 'Invalid Parameters',
                errors: ['Missing userId', 'Missing tenantId'],
            });
        });
    });
});
