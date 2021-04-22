import { MatchTypes, Mocks, MatchApiTypes } from '@therify/types';
import axios, { AxiosPromise, Method } from 'axios';
import { adaptApiMatches } from './utils';

export type getMatchesOptions = {
    token: string;
};
export type createMatchOptions = {
    userId: string;
    providerId: string;
};

type MatchesApiResponse = {
    data: {
        count: number;
        scannedCount: number;
        Items: MatchApiTypes.GetMatchesResponse[];
    };
    errors: any[];
};
// TODO: move to env
const API_BASE_URL = 'https://e20m2ce7nk.execute-api.us-east-1.amazonaws.com/dev/api/v1';
const MatchesApiCreator = (baseUrl: string) => {
    const makeRequest = async (url: string, method?: Method): Promise<AxiosPromise<MatchesApiResponse>> => {
        return axios({
            url,
            method: method ?? 'GET',
            headers: {
                // APIKEY,
            },
        });
    };

    const getMatches = async (options: getMatchesOptions): Promise<MatchTypes.Match[]> => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/matches`);
        console.log({ items: axiosData.data.Items });
        return adaptApiMatches(axiosData?.data?.Items ?? []);
    };

    const createMatch = async ({ userId, providerId }: createMatchOptions) => {
        return await new Promise<MatchTypes.Ranking>((resolve) =>
            setTimeout(() => {
                console.log(`%cCreating Match for user '${userId}' and provider '${providerId}'...`, 'color: green');
                resolve(Mocks.mockRanking);
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
                resolve(Mocks.mockProviders);
            }, 2000),
        );
    };
    return { getMatches, createMatch, approveMatch, denyMatch, listProviders };
};

export const MatchesApi = MatchesApiCreator(API_BASE_URL);
