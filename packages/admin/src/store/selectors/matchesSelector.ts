import { MatchTypes } from '@therify/types';
import { MatchesStore } from '../reducers/matchesReducer';
import { removeDeniedRankings, removeDeniedRankingsFromMatch } from '../../utils/Matches';
type Store = { matchesStore: MatchesStore };
export const getMatchesState = (store: Store) => store.matchesStore.matches;

export const getAllMatches = (store: Store) => Object.values(getMatchesState(store));

export const getApprovedMatches = (store: Store): MatchTypes.Match[] => {
    const matches = getAllMatches(store);
    const deniedRankingIds = getDeniedRankingIds(store);
    return removeDeniedRankings(matches, deniedRankingIds);
};

export const getAllMatchesForUser = (userId: string) => (store: Store): MatchTypes.Ranking[] => {
    return getMatchesState(store)[userId]?.matches ?? [];
};

export const getApprovedMatchesForUser = (userId: string) => (store: Store): MatchTypes.Ranking[] => {
    const deniedRankingIds = getDeniedRankingIds(store);
    const userMatch = getMatchesState(store)[userId];
    return userMatch ? removeDeniedRankingsFromMatch(userMatch, deniedRankingIds).matches : [];
};

export const getDeniedRankingIds = ({ matchesStore }: Store) => matchesStore.deniedRankingIds;
