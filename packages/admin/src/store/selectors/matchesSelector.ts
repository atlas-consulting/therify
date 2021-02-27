import { MatchesStore } from '../reducers/matchesReducer';
type Store = { matches: MatchesStore };
export const getMatchesState = ({ matches }: Store) => matches.modelResults;

export const getMatches = (store: Store) => Object.values(getMatchesState(store));
