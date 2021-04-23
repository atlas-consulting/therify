import { cleanup } from '@testing-library/react';
import { MatchesActionType, setMatches, setMatch, removeRankingFromUser } from '../actions';
import { mockStore, mockMatch as mockModelResult } from '../mocks';
import matchesReducer from './matchesReducer';
const { matchesStore } = mockStore;
const mockState = {
    ...matchesStore,
    matches: {},
    deniedRankingIds: new Set([]),
};
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
                [mockModelResult.user.id]: mockModelResult,
            },
        });
    });

    it('should set a single match in state', () => {
        const action = setMatch(mockModelResult);
        expect(matchesReducer(mockState, action)).toStrictEqual({
            ...mockState,
            matches: {
                ...mockState.matches,
                [mockModelResult.user.id]: mockModelResult,
            },
        });
    });

    it('should set rankingId to state', () => {
        const action = removeRankingFromUser('test');
        expect(matchesReducer(mockState, action)).toStrictEqual({
            ...mockState,
            deniedRankingIds: new Set(['test']),
        });
    });
});
