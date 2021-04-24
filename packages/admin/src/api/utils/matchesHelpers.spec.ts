import { MatchApiTypes } from '@therify/types';
import { adaptApiMatches } from './matchesHelpers';
const mockApiResults: MatchApiTypes.GetMatchesResponse[] = [
    {
        modified: '2021-04-21T04:30:37.077Z',
        ttl: 37,
        SK: 'PROVIDER#f49fa136-797a-4f4f-a2f6-48c3fb41108d',
        details: {
            lastName: 'Sadler',
            licensedStates: ['California'],
            race: ['Black or African American'],
            gender: 'Male',
            // therapeuticPractices: [],
            nameOfPractice: 'Therify',
            firstName: 'Warren',
            license: 'Therify',
            createdAt: '',
            emailAddress: 'warren@therify.co',
            specialties: ['ADHD'],
            websiteUrl: 'http://www.therify.co',
            yearsOfExperience: 0,
            rate: 200,
            acceptedInsurance: ['Other'],
            id: 'f49fa136-797a-4f4f-a2f6-48c3fb41108d',
            updatedAt: '',
        },
        PK: 'MATCH#1443c25d-c5f4-4c37-8a47-36082c40c2b6',
        entity: 'Match',
        created: '2021-04-21T04:30:37.077Z',
        type: MatchApiTypes.ResponseType.Provider,
    },
    {
        modified: '2021-04-21T04:30:37.079Z',
        ttl: 37,
        SK: 'USER#54dfdcfd-4e9e-4fa1-bc66-ce5e5817a502',
        details: {
            languagePreference: 'English',
            createdAt: '2021-04-21T04:28:06.689Z',
            emailAddress: 'warrendsadler@gmail.com',
            insuranceProvider: 'Aetna',
            race: ['Black or African American', 'White'],
            gender: 'Male',
            genderPreference: 'Male',
            racePreference: 'Black or African American',
            stateOfResidence: 'California',
            id: '54dfdcfd-4e9e-4fa1-bc66-ce5e5817a502',
            issues: ['Gender or Sexual Identity', 'Life Transitions'],
            updatedAt: '2021-04-21T04:28:06.689Z',
        },
        PK: 'MATCH#1443c25d-c5f4-4c37-8a47-36082c40c2b6',
        entity: 'Match',
        created: '2021-04-21T04:30:37.079Z',
        type: MatchApiTypes.ResponseType.User,
    },
    {
        userEmailAddress: 'warrendsadler@gmail.com',
        modified: '2021-04-21T04:38:57.063Z',
        providerEmailAddress: 'warren@therify.co',
        score: 45,
        ttl: 57,
        SK: 'MATCH#3949ec8a-375f-4fbd-8ef7-f1fb3019df08',
        PK: 'MATCH#3949ec8a-375f-4fbd-8ef7-f1fb3019df08',
        entity: 'Match',
        created: '2021-04-21T04:38:57.063Z',
        criteria: {
            insurance: {
                preference: 'Aetna',
                isMet: false,
            },
            stateOfResidence: {
                preference: 'California',
                isMet: true,
            },
            race: {
                preference: 'Black or African American',
                isMet: true,
            },
            gender: {
                preference: 'Male',
                isMet: true,
            },
            issues: {
                preference: ['Gender or Sexual Identity', 'Life Transitions'],
                isMet: false,
            },
        },
        type: MatchApiTypes.ResponseType.Match,
    },
];
describe('matchHelpers', () => {
    it('should transform json payload into Match array', () => {
        const mockProvider = mockApiResults[0] as MatchApiTypes.IProvider;
        const mockUser = mockApiResults[1] as MatchApiTypes.IUser;
        const mockMatch = mockApiResults[2] as MatchApiTypes.IMatch;
        expect(adaptApiMatches(mockApiResults)).toStrictEqual([
            {
                user: mockUser.details,
                matches: [
                    {
                        id: mockMatch.PK,
                        score: mockMatch.score,
                        providerEmailAddress: mockMatch.providerEmailAddress,
                        userEmailAddress: mockMatch.userEmailAddress,
                        criteria: mockMatch.criteria,
                        provider: mockProvider.details,
                    },
                ],
            },
        ]);
    });
});
