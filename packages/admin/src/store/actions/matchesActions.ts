import { MatchTypes } from '@therify/types';
// Todo: type out content
export enum MatchesActionTypes {
    SET_MATCHES = 'SET_MATCHES',
}

export interface ISetMatchesAction {
    type: MatchesActionTypes;
    payload: { matches: MatchTypes.Match[] };
}
export const setMatches = (matches: MatchTypes.Match[]): ISetMatchesAction => ({
    type: MatchesActionTypes.SET_MATCHES,
    payload: { matches },
});
