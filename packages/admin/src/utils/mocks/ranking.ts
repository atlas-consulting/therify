import { RankingStatus } from '@therify/types/lib/match';

export const mockModelResult = {
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
