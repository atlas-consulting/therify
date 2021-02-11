import { MatchesActions } from '../actions';

const initialState = {
    matches: [],
};

// TODO: Type out action
export default function matchesReducer(state = initialState, action: any) {
    switch (action.type) {
        case MatchesActions.ADD_MATCHES: {
            const { newMatches } = action.payload;
            return {
                ...state,
                matches: [...newMatches],
            };
        }
        default:
            return state;
    }
}
