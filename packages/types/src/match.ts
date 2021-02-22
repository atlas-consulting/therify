// TODO: Type this out correctly
export type Match = {
    patient: Patient,
    matches: Ranking[]
};

export type Features = {
    state: string;
    network: string;
    gender: string;
    race: string;
    specialty: string;
}
export type Patient = {
    email: string;
    id: string;
    company: string;
    preferences: Features;
};

export type Ranking = {
    id: string,
    provider: {name: string} & Features,
    status: RankingStatus,
};

export enum RankingStatus {
    GOOD = 'good',
    WARNING = 'warning',
    INCOMPATIBLE = 'incompatible',
}