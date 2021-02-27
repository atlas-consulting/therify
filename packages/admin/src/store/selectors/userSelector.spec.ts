import { getUserState, getUserToken } from './userSelector';
const mockUser = {
    firstName: 'Test',
    lastName: 'Jackson',
    email: 'test@j.com',
    id: 'test1234',
    token: 'xxxxxxxxxxxx',
};

describe('userSelector', () => {
    describe('getUserState', () => {
        it('should return state object', () => {
            expect(getUserState({ ...mockUser })).toStrictEqual(mockUser);
        });
    });

    describe('getUserToken', () => {
        it('should return matches as array', () => {
            expect(getUserToken({ ...mockUser })).toBe(mockUser.token);
        });
    });
});