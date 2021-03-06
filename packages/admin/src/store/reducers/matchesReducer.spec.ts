import { mockModelResult } from '../../api/mocks/rankingResult';
import { MatchesActionType, setMatches, removeRankingFromPatient } from '../actions';
import matchesReducer, { MatchesStore } from './matchesReducer';
const mockState: MatchesStore = {
    matches: {},
    deniedRankingIds: new Set([]),
};
describe('matches reducer', () => {
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

    it('should set rankingId to state', () => {
        const action = removeRankingFromPatient('test');
        expect(matchesReducer(mockState, action)).toStrictEqual({
            ...mockState,
            deniedRankingIds: new Set(['test']),
        });
    });
});
