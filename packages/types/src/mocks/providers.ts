import { Provider } from '../match';
export const mockProvider: Provider = {
    id: '144',
    emailAddress: 'test.jackson@therapy.com',
    nameOfPractice: 'test',
    firstName: 'Test',
    lastName: 'Jackson',
    licensedStates: ['Tennessee'],
    acceptedInsurance: ['Cigna'],
    gender: 'male',
    race: ['Black or African American'],
    specialties: ['Stress'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rate: 10,
    yearsOfExperience: 5,
    theraputicPractices: [],
};
export const mockProvider2: Provider = {
    id: 'xx3',
    emailAddress: 'testjameson@therapy.com',
    nameOfPractice: 'test',
    firstName: 'Test',
    lastName: 'Jameson',
    licensedStates: ['Tennessee'],
    acceptedInsurance: ['Cigna'],
    gender: 'male',
    race: ['Black or African American'],
    specialties: ['Stress'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rate: 10,
    yearsOfExperience: 5,
    theraputicPractices: [],
};

export const mockProvider3: Provider = {
    id: 'xx3',
    emailAddress: 'test.johnson@therapy.com',
    nameOfPractice: 'test',
    firstName: 'Test',
    lastName: 'Johnson',
    licensedStates: ['Tennessee'],
    acceptedInsurance: ['Cigna'],
    gender: 'male',
    race: ['Black or African American'],
    specialties: ['Stress'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rate: 10,
    yearsOfExperience: 5,
    theraputicPractices: [],
};
export const mockProviders: Provider[] = [mockProvider, mockProvider2, mockProvider3];
