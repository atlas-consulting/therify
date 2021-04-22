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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '';
const MatchesApiCreator = (baseUrl: string) => {
    if (baseUrl === '') throw new Error("Can't create api without a base url!");
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
    const approveMatchesForUser = async (userId: string) => {
        return await new Promise<void>((resolve) =>
            setTimeout(() => {
                console.log(`%cApproving Match: ${userId}`, 'color: green');
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
    return { getMatches, createMatch, approveMatchesForUser, denyMatch, listProviders };
};

export const MatchesApi = MatchesApiCreator(API_BASE_URL);
