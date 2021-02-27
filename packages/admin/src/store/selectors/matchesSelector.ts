import { MatchesStore } from '../reducers/matchesReducer';

export const getMatchesState = (store: MatchesStore) => store.matches;

export const getMatches = (store: MatchesStore) => Object.values(getMatchesState(store));
