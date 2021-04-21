import { Match, Ranking } from '../match';
import { mockUser } from './user';
import { mockProvider, mockProvider2, mockProvider3 } from './providers';

export const mockModelResult: Match = {
    id: 'test1234',
    patient: mockUser,
    matches: [
        {
            id: 'test1',
            provider: mockProvider,
        },
        {
            id: 'test2',
            provider: mockProvider2,
        },
        {
            id: 'test3',
            provider: mockProvider3,
        },
    ],
};

export const mockRanking: Ranking = {
    id: 'test789',
    provider: mockProvider,
};

export const mockModelResultsList: Match[] = [
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test1' }, id: 'test1' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test2' }, id: 'test2' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test3' }, id: 'test3' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test4' }, id: 'test4' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test5' }, id: 'test5' },
];
