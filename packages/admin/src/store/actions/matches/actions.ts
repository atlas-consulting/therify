import { MatchesActions } from './constants';

// Todo: type out content
export const addMatches = (content: any) => ({
    type: MatchesActions.ADD_MATCHES,
    payload: {
        matches: [],
    },
});
