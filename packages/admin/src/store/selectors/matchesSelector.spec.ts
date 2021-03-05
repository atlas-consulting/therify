import { MatchTypes } from '@therify/types';
import { getDeniedRankingIds, getMatches, getMatchesState } from './matchesSelector';

const mockMatch = ({ id: 'test', matches: [] } as unknown) as MatchTypes.Match;
const mockDeniedRankingId = 'test1';
const mockStore = {
    matches: {
        matches: { test: mockMatch },
        deniedRankingIds: new Set<string>([mockDeniedRankingId]),
    },
};
describe('matchesSelector', () => {
    describe('getMatchesState', () => {
        it('should return state object', () => {
            expect(getMatchesState(mockStore)).toStrictEqual({
                test: mockMatch,
            });
        });
    });

    describe('getMatches', () => {
        it('should return matches as array', () => {
            expect(getMatches(mockStore)).toStrictEqual([mockMatch]);
        });
    });

    describe('getDeniedRankingIdsState', () => {
        it('should return state object', () => {
            expect(getDeniedRankingIds(mockStore)).toStrictEqual(new Set([mockDeniedRankingId]));
        });
    });
});
