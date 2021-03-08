import { MatchTypes } from '@therify/types';
import { mockModelResultsList, mockProviders, mockRanking } from './mocks';

export type getMatchesOptions = {
    token: string;
};
export type createMatchOptions = {
    patientId: string;
    providerId: string;
    matchId: string;
};

const MatchesApiCreator = () => {
    const getMatches = async (options: getMatchesOptions) => {
        return await new Promise<MatchTypes.Match[]>((resolve) =>
            setTimeout(() => {
                console.log(`%cGetting Matches`, 'color: green');
                resolve(mockModelResultsList);
            }, 2000),
        );
    };
    const createMatch = async ({ patientId, providerId }: createMatchOptions) => {
        return await new Promise<MatchTypes.Ranking>((resolve) =>
            setTimeout(() => {
                console.log(
                    `%cCreating Match for patient '${patientId}' and provider '${providerId}'...`,
                    'color: green',
                );
                resolve(mockRanking);
            }, 2000),
        );
    };
    const approveMatch = async (matchId: string) => {
        return await new Promise<void>((resolve) =>
            setTimeout(() => {
                console.log(`%cApproving Match: ${matchId}`, 'color: green');
                resolve();
            }, 2000),
        );
    };
    const denyMatch = async (matchId: string, reason?: string) => {
        return await new Promise<void>((resolve) =>
            setTimeout(() => {
                console.log(`%cDenying Match: ${matchId}`, 'color: red');
                resolve();
            }, 2000),
        );
    };
    const listProviders = async (queryString?: string) => {
        return await new Promise<MatchTypes.Provider[]>((resolve) =>
            setTimeout(() => {
                console.log(`%Fetching providers with traits: ${queryString}`, 'color: green');
                resolve(mockProviders);
            }, 2000),
        );
    };
    return { getMatches, createMatch, approveMatch, denyMatch, listProviders };
};

export const MatchesApi = MatchesApiCreator();
