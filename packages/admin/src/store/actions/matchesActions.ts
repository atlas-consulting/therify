import { MatchTypes } from '@therify/types';

export interface IMatchesAction<PayloadType> {
    type: MatchesActionType;
    payload: PayloadType;
}
export enum MatchesActionType {
    SET_MATCHES = 'SET_MATCHES',
    SET_MATCH = 'SET_MATCH',
    REMOVE_RANKING_FROM_PATIENT = 'REMOVE_RANKING_FROM_PATIENT',
}
export const setMatches = (matches: MatchTypes.Match[]): IMatchesAction<MatchTypes.Match[]> => ({
    type: MatchesActionType.SET_MATCHES,
    payload: matches,
});
export const setMatch = (match: MatchTypes.Match): IMatchesAction<MatchTypes.Match> => ({
    type: MatchesActionType.REMOVE_RANKING_FROM_PATIENT,
    payload: match,
});
export const removeRankingFromPatient = (rankingId: string): IMatchesAction<string> => ({
    type: MatchesActionType.REMOVE_RANKING_FROM_PATIENT,
    payload: rankingId,
});
