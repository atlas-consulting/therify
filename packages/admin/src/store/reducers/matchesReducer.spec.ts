import { cleanup } from '@testing-library/react';
import { Mocks } from '@therify/types';
import { MatchesActionType, setMatches, setMatch, removeRankingFromPatient } from '../actions';
import matchesReducer, { MatchesStore } from './matchesReducer';
const mockState: MatchesStore = {
    matches: {},
    deniedRankingIds: new Set([]),
};
const { mockModelResult } = Mocks;
describe('matches reducer', () => {
    afterEach(cleanup);
    it('should return default state', () => {
        const type = '' as MatchesActionType;
        expect(matchesReducer(mockState, { type, payload: undefined })).toStrictEqual(mockState);
    });

    it('should set matches to state', () => {
        const action = setMatches([mockModelResult]);
        expect(matchesReducer(mockState, action)).toStrictEqual({
            ...mockState,
            matches: {
                [mockModelResult.id]: mockModelResult,
            },
        });
    });

    it('should set a single match in state', () => {
        const newMatch = { ...mockModelResult, id: '999xxx' };
        const action = setMatch(newMatch);
        expect(matchesReducer(mockState, action)).toStrictEqual({
            ...mockState,
            matches: {
                ...mockState.matches,
                [newMatch.id]: newMatch,
            },
        });
    });

    it('should set rankingId to state', () => {
        const action = removeRankingFromPatient('test');
        expect(matchesReducer(mockState, action)).toStrictEqual({
            ...mockState,
            deniedRankingIds: new Set(['test']),
        });
    });
});
