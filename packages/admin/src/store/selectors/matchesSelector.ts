import { MatchesStore } from '../reducers/matchesReducer';

export const getMatchesState = (store: MatchesStore) => store.matches;

export const getMatchesArray = (store: MatchesStore) => Object.values(getMatchesState(store));
