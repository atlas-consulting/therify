import { MatchTypes } from '@therify/types';
import { IMatchesAction, MatchesActionType, SetMatchesPayload } from '../actions';
export type MatchesStore = {
    modelResults: Record<string, MatchTypes.Match>;
};
const initialState: MatchesStore = {
    modelResults: {},
};

export default function matchesReducer(state = initialState, action: IMatchesAction<unknown>) {
    switch (action.type) {
        case MatchesActionType.SET_MATCHES:
            const {
                payload: { matches },
            } = action as IMatchesAction<SetMatchesPayload>;
            const matchesMap = matches.reduce((map, match) => {
                map[match.id] = match;
                return map;
            }, {} as Record<string, MatchTypes.Match>);
            return {
                ...state,
                modelResults: matchesMap,
            };
        default:
            return state;
    }
}
