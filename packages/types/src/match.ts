// TODO: Type this out correctly
export type Match = {
    id: string;
    patient: Patient;
    matches: Ranking[];
};

export type Features = {
    state: string;
    network: string;
    gender: string;
    race: string;
    specialties: string;
};
export type Patient = {
    email: string;
    id: string;
    company: string;
    preferences: Features;
};

export type Provider = {
    id: string;
    emailAddress: string;
    nameOfPractice: string;
    firstName: string;
    lastName: string;
    licensedStates: string[];
    acceptedInsurance: string[];
    gender: string;
    race: string[];
    specialties: string[];
    createdAt: string;
    updatedAt: string;
};

export type Ranking = {
    id: string;
    provider: Provider;
    status: RankingStatus;
};

export enum RankingStatus {
    GOOD = 'good',
    WARNING = 'warning',
    INCOMPATIBLE = 'incompatible',
}
