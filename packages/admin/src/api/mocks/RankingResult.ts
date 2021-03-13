import { MatchTypes } from '@therify/types';
import { RankingStatus } from '@therify/types/lib/match';
import { mockProvider } from './providers';

export const mockModelResult: MatchTypes.Match = {
    id: 'test1234',
    patient: {
        email: 'test@storybook.com',
        id: '123',
        company: 'Therify',
        preferences: {
            state: 'TN',
            network: 'Cigna',
            gender: 'male',
            race: 'No ',
            specialty: 'Stress',
        },
    },
    matches: [
        {
            id: 'test1',
            status: RankingStatus.GOOD,
            provider: {
                id: 'xx1',
                name: 'Dr. Test Jackson',
                state: 'TN',
                acceptedNetworks: ['Cigna'],
                gender: 'male',
                race: 'No ',
                specialty: 'Stress',
            },
        },
        {
            id: 'test2',
            status: RankingStatus.WARNING,
            provider: {
                id: 'xx2',
                name: 'Dr. Test Jameson',
                state: 'TN',
                acceptedNetworks: ['Cigna'],
                gender: 'male',
                race: 'No ',
                specialty: 'Stress',
            },
        },
        {
            status: RankingStatus.INCOMPATIBLE,
            id: 'test3',
            provider: {
                id: 'xx3',
                name: 'Dr. Test Johnson',
                state: 'TN',
                acceptedNetworks: ['Cigna'],
                gender: 'male',
                race: 'No ',
                specialty: 'Stress',
            },
        },
    ],
};

export const mockRanking: MatchTypes.Ranking = {
    status: RankingStatus.INCOMPATIBLE,
    id: 'test789',
    provider: mockProvider,
};

export const mockModelResultsList: MatchTypes.Match[] = [
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test1' }, id: 'test1' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test2' }, id: 'test2' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test3' }, id: 'test3' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test4' }, id: 'test4' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test5' }, id: 'test5' },
];
