import { mockModelResult } from '../../utils/mocks/ranking';
import { MatchesActionType, setMatches } from '../actions';
import matchesReducer, { MatchesStore } from './matchesReducer';
const mockState: MatchesStore = {
    matches: {},
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
});
