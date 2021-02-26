import { UserStore } from '../reducers/userReducer';

export const getUserState = (store: UserStore) => store;

export const getUserToken = (store: UserStore) => store.token;
