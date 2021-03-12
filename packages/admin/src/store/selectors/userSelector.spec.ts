import { getUserFirstName, getUserLastName, getUserName, getUserState, getUserToken } from './userSelector';
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
            expect(getUserState({ user: { ...mockUser } })).toStrictEqual(mockUser);
        });
    });

    describe('user details', () => {
        it('should getUserToken', () => {
            expect(getUserToken({ user: { ...mockUser } })).toBe(mockUser.token);
        });

        it('should getUserFirstName', () => {
            expect(getUserFirstName({ user: { ...mockUser } })).toBe(mockUser.firstName);
        });

        it('should getUserLastName', () => {
            expect(getUserLastName({ user: { ...mockUser } })).toBe(mockUser.lastName);
        });

        it('should getUserName', () => {
            expect(getUserName({ user: { ...mockUser } })).toBe(`${mockUser.firstName} ${mockUser.lastName}`);
        });
    });
});
