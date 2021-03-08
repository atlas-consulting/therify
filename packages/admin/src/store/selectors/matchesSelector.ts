import { MatchTypes } from '@therify/types';
import { MatchesStore } from '../reducers/matchesReducer';
type Store = { matchesStore: MatchesStore };
export const getMatchesState = ({ matchesStore }: Store) => matchesStore.matches;
export const getMatches = (store: Store) => {
    const matchesArr = Object.values(getMatchesState(store));
    const deniedRankingIds = getDeniedRankingIds(store);
    return matchesArr.map((match) => ({
        ...match,
        matches: match.matches.filter((ranking) => !deniedRankingIds.has(ranking.id)),
    }));
};

export const getMatchById = (store: Store, id: string): MatchTypes.Match | undefined => {
    return store.matchesStore.matches[id];
};

export const getDeniedRankingIds = ({ matchesStore }: Store) => matchesStore.deniedRankingIds;
