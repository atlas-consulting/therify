import { MatchTypes } from '@therify/types';
import {
    getDeniedRankingIds,
    getAllMatchesForUser,
    getMatchesState,
    getApprovedMatchesForUser,
    getApprovedMatches,
    getAllMatches,
} from './matchesSelector';
import {
    mockDeniedRankingId,
    mockDeniedRankingIdsSet,
    mockMatch,
    mockMatchWithDeniedRanking,
    MockStore,
    mockStore,
} from '../mocks';
import { removeDeniedRankings } from '../../utils/Matches';

const mockStoreWithDeniedRanking: MockStore = {
    ...mockStore,
    matchesStore: {
        ...mockStore.matchesStore,
        matches: {
            ...mockStore.matchesStore.matches,
            [mockMatchWithDeniedRanking.user.id]: mockMatchWithDeniedRanking,
        },
    },
};
describe.only('matchesSelector', () => {
    describe('getMatchesState', () => {
        it('should return state object', () => {
            expect(getMatchesState(mockStore)).toStrictEqual({
                [mockMatch.user.id]: mockMatch,
            });
        });
    });

    describe('getAllMatches', () => {
        it('should return matches as array', () => {
            expect(getAllMatches(mockStoreWithDeniedRanking)).toStrictEqual(
                Object.values(mockStoreWithDeniedRanking.matchesStore.matches),
            );
        });
    });

    describe('getApprovedMatches', () => {
        it('should return matches as array with only approved rankings', () => {
            const approvedMatches = getApprovedMatches(mockStoreWithDeniedRanking);
            const result = removeDeniedRankings(
                Object.values(mockStoreWithDeniedRanking.matchesStore.matches),
                mockStoreWithDeniedRanking.matchesStore.deniedRankingIds,
            );
            expect(approvedMatches).toStrictEqual(result);
        });
    });

    describe('getAllMatchesForUser', () => {
        const secondMatch = ({
            ...mockMatch,
            matches: ['these should be actual ranking objects'],
            user: { id: 'abc123' },
        } as unknown) as MatchTypes.Match;
        const testStore = {
            matchesStore: {
                ...mockStore.matchesStore,
                matches: {
                    ...mockStore.matchesStore.matches,
                    [secondMatch.user.id]: secondMatch,
                },
            },
        };

        it('should return matches array for single user', () => {
            const selector = getAllMatchesForUser(secondMatch.user.id);
            expect(selector(testStore)).toStrictEqual(secondMatch.matches);
        });

        it('should return empty array when user not found', () => {
            const selector = getAllMatchesForUser('This is not a user id');
            expect(selector(testStore)).toStrictEqual([]);
        });
    });

    describe('getApprovedMatchesForUser', () => {
        const secondMatch = ({
            ...mockMatch,
            matches: [{ id: mockDeniedRankingId }],
            user: { id: 'abc123' },
        } as unknown) as MatchTypes.Match;
        const testStore = {
            matchesStore: {
                ...mockStore.matchesStore,
                matches: {
                    ...mockStore.matchesStore.matches,
                    [secondMatch.user.id]: secondMatch,
                },
            },
        };

        it('should return matches array for single user without denied rankings', () => {
            const selector = getApprovedMatchesForUser(secondMatch.user.id);
            expect(selector(testStore)).toStrictEqual([]);
        });

        it('should return empty array when user not found', () => {
            const selector = getApprovedMatchesForUser('This is not a user id');
            expect(selector(testStore)).toStrictEqual([]);
        });
    });

    describe('getDeniedRankingIdsState', () => {
        it('should return state object', () => {
            expect(getDeniedRankingIds(mockStore)).toStrictEqual(mockDeniedRankingIdsSet);
        });
    });
});
