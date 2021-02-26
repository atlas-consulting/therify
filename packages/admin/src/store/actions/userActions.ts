import { User } from '../../models';

// Todo: type out content
export enum UserActionTypes {
    SET_USER = 'SET_USER',
}

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
