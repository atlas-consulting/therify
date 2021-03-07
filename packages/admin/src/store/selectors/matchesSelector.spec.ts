import { MatchTypes } from '@therify/types';
import { MatchesStore } from '../reducers/matchesReducer';
import { getDeniedRankingIds, getMatches, getMatchesState } from './matchesSelector';

const mockMatch = ({ id: 'testid', matches: [] } as unknown) as MatchTypes.Match;
const mockDeniedRankingId = 'test1';
const mockStore: { matchesStore: MatchesStore } = {
    matchesStore: {
        matches: { [mockMatch.id]: mockMatch },
        deniedRankingIds: new Set<string>([mockDeniedRankingId]),
    },
};
describe('matchesSelector', () => {
    describe('getMatchesState', () => {
        it('should return state object', () => {
            expect(getMatchesState(mockStore)).toStrictEqual({
                [mockMatch.id]: mockMatch,
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
