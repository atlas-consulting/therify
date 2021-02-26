import { UserActionTypes, ISetUserAction } from '../actions';
export type UserStore = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    token: string;
};
const initialState: UserStore = {
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    token: '',
};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            const { payload: userDetails } = action.payload as ISetUserAction;
            return {
                ...state,
                ...userDetails,
            };
        default:
            return state;
    }
}
