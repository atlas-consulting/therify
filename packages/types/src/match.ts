// TODO: Type this out correctly
export type Match = {
    id: string;
    patient: User;
    matches: Ranking[];
};

export type Features = {
    state: string;
    network: string;
    gender: string;
    race: string;
    specialties: string;
};

export type User = {
    id: string;
    emailAddress: string;
    stateOfResidence: string;
    gender: string;
    genderPreference: string;
    race: string[];
    racePreference: string;
    issues: string[];
    insuranceProvider: string;
    languagePreference: string;
    createdAt: string;
    updatedAt: string;
};

export type Provider = {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    licensedStates: string[];
    acceptedInsurance: string[];
    yearsOfExperience: number;
    gender: string;
    race: string[];
    specialties: string[];
    createdAt: string;
    updatedAt: string;
    rate: number;
    license?: string;
    websiteUrl?: string;
    nameOfPractice?: string;
};

export type Ranking = {
    id: string;
    provider: Provider;
};

export enum RankingStatus {
    GOOD = 'good',
    WARNING = 'warning',
    INCOMPATIBLE = 'incompatible',
}
