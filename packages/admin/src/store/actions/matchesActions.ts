import { MatchTypes } from '@therify/types';

export interface IMatchesAction<PayloadType> {
    type: MatchesActionType;
    payload: PayloadType;
}
export enum MatchesActionType {
    SET_MATCHES = 'SET_MATCHES',
    REMOVE_RANKING_FROM_PATIENT = 'REMOVE_RANKING_FROM_PATIENT',
}
export type SetMatchesPayload = { matches: MatchTypes.Match[] };
export const setMatches = (matches: MatchTypes.Match[]): IMatchesAction<SetMatchesPayload> => ({
    type: MatchesActionType.SET_MATCHES,
    payload: { matches },
});
export const removeRankingFromPatient = (rankingId: string): IMatchesAction<string> => ({
    type: MatchesActionType.REMOVE_RANKING_FROM_PATIENT,
    payload: rankingId,
});
