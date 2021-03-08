import { MatchTypes } from '@therify/types';
import { IMatchesAction, MatchesActionType } from '../actions';
export type MatchesStore = {
    matches: Record<string, MatchTypes.Match>;
    deniedRankingIds: Set<string>;
};
const initialState: MatchesStore = {
    matches: {},
    deniedRankingIds: new Set(),
};

export default function matchesReducer(state = initialState, action: IMatchesAction<unknown>) {
    switch (action.type) {
        case MatchesActionType.SET_MATCHES:
            const { payload: matches } = action as IMatchesAction<MatchTypes.Match[]>;
            const matchesMap = matches.reduce((map, match) => {
                map[match.id] = match;
                return map;
            }, {} as Record<string, MatchTypes.Match>);
            return {
                ...state,
                matches: matchesMap,
            };
        case MatchesActionType.SET_MATCH:
            const { payload: match } = action as IMatchesAction<MatchTypes.Match>;
            return {
                ...state,
                matches: {
                    ...state.matches,
                    [match.id]: match,
                },
            };
        case MatchesActionType.REMOVE_RANKING_FROM_PATIENT:
            const { payload: rankingId } = action as IMatchesAction<string>;
            return {
                ...state,
                deniedRankingIds: state.deniedRankingIds.add(rankingId),
            };

        default:
            return state;
    }
}
