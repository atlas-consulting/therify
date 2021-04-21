import { Patient } from '../match';

export const mockUser: Patient = {
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
