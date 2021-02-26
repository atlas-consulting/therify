import { MatchTypes } from '@therify/types';

export interface IMatchesAction<PayloadType> {
    type: MatchesActionType;
    payload: PayloadType;
}
export enum MatchesActionType {
    SET_MATCHES = 'SET_MATCHES',
}
export type SetMatchesPayload = { matches: MatchTypes.Match[] };
export const setMatches = (matches: MatchTypes.Match[]): IMatchesAction<SetMatchesPayload> => ({
    type: MatchesActionType.SET_MATCHES,
    payload: { matches },
});
