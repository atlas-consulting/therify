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
    specialty: string;
};
export type Patient = {
    email: string;
    id: string;
    company: string;
    preferences: Features;
};

export type Provider = {
    name: string;
    id: string;
    state: string;
    acceptedNetworks: string[];
    gender: string;
    race: string;
    specialty: string;
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
