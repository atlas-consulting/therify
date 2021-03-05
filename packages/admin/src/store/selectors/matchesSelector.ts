import { MatchesStore } from '../reducers/matchesReducer';
type Store = { matches: MatchesStore };
export const getMatchesState = ({ matches }: Store) => matches.matches;
export const getMatches = (store: Store) => {
    const matchesArr = Object.values(getMatchesState(store));
    const deniedRankingIds = getDeniedRankingIds(store);
    return matchesArr.map((match) => ({
        ...match,
        matches: match.matches.filter((ranking) => !deniedRankingIds.has(ranking.id)),
    }));
};

export const getDeniedRankingIds = ({ matches }: Store) => matches.deniedRankingIds;
