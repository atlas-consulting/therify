import { Provider, User } from '../match';

export enum ResponseType {
    Match = 'Match',
    Provider = 'Provider',
    User = 'User',
}

export interface IProvider {
    type: ResponseType.Provider;
    PK: string;
    SK: string;
    ttl: number;
    GSI1PK?: string;
    emailAddress?: string;
    details: Provider;
}

export interface IUser {
    type: ResponseType.User;
    PK: string;
    SK: string;
    ttl: number;
    GSI1PK?: string;
    emailAddress?: string;
    details: User;
}

interface PreferenceCheck {
    preference: string | string[];
    isMet: boolean;
}
export interface IMatch {
    PK: string;
    SK: string;
    GSI1PK?: string;
    ttl: number;
    providerEmailAddress: string;
    userEmailAddress: string;
    type: ResponseType.Match;
    criteria: Record<string, PreferenceCheck>;
    score: number;
}

interface RecordData {
    modified: string;
    created: string;
    entity: 'Match';
}

type Match = IProvider | IUser | IMatch;

export type Response = RecordData & Match;
