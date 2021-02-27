import { UserStore } from '../reducers/userReducer';

type Store = { user: UserStore };
export const getUserState = ({ user }: Store) => user;

export const getUserToken = ({ user }: Store) => user.token;
