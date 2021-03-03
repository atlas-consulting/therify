import { MatchTypes } from '@therify/types';
import { getMatches, getMatchesState } from './matchesSelector';

const mockMatch = { id: 'test' } as MatchTypes.Match;
describe('matchesSelector', () => {
    describe('getMatchesState', () => {
        it('should return state object', () => {
            expect(getMatchesState({ matches: { matches: { test: mockMatch } } })).toStrictEqual({
                test: mockMatch,
            });
        });
    });

    describe('getMatches', () => {
        it('should return matches as array', () => {
            expect(getMatches({ matches: { matches: { test: mockMatch } } })).toStrictEqual([mockMatch]);
        });
    });
});
