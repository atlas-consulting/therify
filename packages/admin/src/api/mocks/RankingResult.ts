import { MatchTypes } from '@therify/types';
import { RankingStatus } from '@therify/types/lib/match';

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
            provider: {
                name: 'Dr. Test Jackson',
                state: 'TN',
                network: 'Cigna',
                gender: 'male',
                race: 'No ',
                specialty: 'Stress',
            },
            status: RankingStatus.GOOD,
        },
        {
            id: 'test2',
            provider: {
                name: 'Dr. Test Jameson',
                state: 'TN',
                network: 'Cigna',
                gender: 'male',
                race: 'No ',
                specialty: 'Stress',
            },
            status: RankingStatus.GOOD,
        },
        {
            id: 'test3',
            provider: {
                name: 'Dr. Test Johnson',
                state: 'TN',
                network: 'Cigna',
                gender: 'male',
                race: 'No ',
                specialty: 'Stress',
            },
            status: RankingStatus.GOOD,
        },
    ],
};

export const mockModelResultsList: MatchTypes.Match[] = [
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test1' }, id: 'test1' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test2' }, id: 'test2' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test3' }, id: 'test3' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test4' }, id: 'test4' },
    { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test5' }, id: 'test5' },
];
