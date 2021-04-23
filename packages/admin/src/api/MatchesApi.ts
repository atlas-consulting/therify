import { MatchTypes, Mocks, MatchApiTypes } from '@therify/types';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
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
const makeFakeRequest = ({ url, config }: any) =>
    new Promise<any>((resolve) => {
        setTimeout(() => {
            console.log('makeFakeRequest:', { url, config });
            resolve(undefined);
        }, 2000);
    });

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '';
const MatchesApiCreator = (baseUrl: string) => {
    if (baseUrl === '') throw new Error("Can't create api without a base url!");
    const makeRequest = async (
        url: string,
        config?: AxiosRequestConfig & { shouldFakeRequest?: boolean },
    ): Promise<AxiosPromise<MatchesApiResponse>> => {
        if (config?.shouldFakeRequest) return makeFakeRequest({ url, config });
        return axios({
            ...(config ?? {}),
            url,
            method: config?.method ?? 'GET',
        });
    };

    const getMatches = async (options: getMatchesOptions): Promise<MatchTypes.Match[]> => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/matches`);
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
    const approveMatches = async (matchIds: string[]) => {
        const { data: axiosData } = await makeRequest(`${baseUrl}/matches/approve`, {
            method: 'POST',
            data: { matchIds },
            shouldFakeRequest: true,
        });
        return axiosData?.data ?? [];
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
    return { getMatches, createMatch, approveMatches, denyMatch, listProviders };
};

export const MatchesApi = MatchesApiCreator(API_BASE_URL);
