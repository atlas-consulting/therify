import { MatchTypes } from '@therify/types';
import { MatchesActionTypes, ISetMatchesAction } from '../actions';
export type MatchesStore = {
    matches: Record<string, MatchTypes.Match>;
};
const initialState: MatchesStore = {
    matches: {},
};

export default function matchesReducer(state = initialState, action: any) {
    switch (action.type) {
        case MatchesActionTypes.SET_MATCHES:
            const {
                payload: { matches },
            } = action.payload as ISetMatchesAction;
            const matchesMap = matches.reduce((map, match) => {
                map[match.id] = match;
                return map;
            }, {} as Record<string, MatchTypes.Match>);
            return {
                ...state,
                matches: matchesMap,
            };
        default:
            return state;
    }
}
