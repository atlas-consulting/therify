import { MatchTypes } from '@therify/types';

export const mockUser: MatchTypes.Patient = {
    email: 'patient@therifydev.com',
    id: '123',
    company: 'Therify',
    preferences: {
        state: 'TN',
        network: 'Cigna',
        gender: 'male',
        race: 'other',
        specialties: 'stress',
    },
};
