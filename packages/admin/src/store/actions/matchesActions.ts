import { MatchTypes } from '@therify/types';

export interface IMatchesAction<PayloadType> {
    type: MatchesActionType;
    payload: PayloadType;
}
export enum MatchesActionType {
    SET_MATCHES = 'SET_MATCHES',
    SET_MATCH = 'SET_MATCH',
    REMOVE_RANKING_FROM_USER = 'REMOVE_RANKING_FROM_USER',
}
export const setMatches = (matches: MatchTypes.Match[]): IMatchesAction<MatchTypes.Match[]> => ({
    type: MatchesActionType.SET_MATCHES,
    payload: matches,
});
export const setMatch = (match: MatchTypes.Match): IMatchesAction<MatchTypes.Match> => ({
    type: MatchesActionType.SET_MATCH,
    payload: match,
});
export const removeRankingFromUser = (rankingId: string): IMatchesAction<string> => ({
    type: MatchesActionType.REMOVE_RANKING_FROM_USER,
    payload: rankingId,
});
