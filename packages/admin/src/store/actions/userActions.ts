// Todo: type out content
export enum UserActionTypes {
    SET_USER = 'SET_USER',
}

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    token: string;
};

export interface ISetUserAction {
    type: UserActionTypes;
    payload: User;
}
export const setUser = (user: User): ISetUserAction => ({
    type: UserActionTypes.SET_USER,
    payload: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
        token: user.token,
    },
});
