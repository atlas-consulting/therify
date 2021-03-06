import { MatchTypes } from '@therify/types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMatchOptions, MatchesApi } from '../api/MatchesApi';
import { removeRankingFromPatient, setMatches } from '../store/actions';
import { getMatches as getMatchesState, getUserToken } from '../store/selectors';

export const useMatchesApi = () => ({
    ...useGetMatches(),
    ...useApproveMatch(),
    ...useDenyMatch(),
    ...useCreateMatch(),
    ...useListProviders(),
});

const useGetMatches = () => {
    const [isLoadingMatches, setIsLoadingMatches] = useState(false);
    const [getMatchesError, setGetMatchesError] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();
    const matches = useSelector(getMatchesState);
    const token = useSelector(getUserToken);
    const getMatches = async () => {
        setIsLoadingMatches(true);
        setGetMatchesError(undefined);
        try {
            const results = await MatchesApi.getMatches({ token });
            dispatch(setMatches(results));
        } catch (error) {
            setGetMatchesError(error.message);
        }
        setIsLoadingMatches(false);
    };
    return {
        matches,
        isLoadingMatches,
        getMatches,
        getMatchesError,
    };
};

const useApproveMatch = () => {
    const [isApprovingMatch, setIsApprovingMatch] = useState(false);
    const [approveMatchError, setApproveMatchError] = useState<string | undefined>(undefined);

    const approveMatch = async (matchId: string) => {
        setIsApprovingMatch(true);
        setApproveMatchError(undefined);
        try {
            await MatchesApi.approveMatch(matchId);
        } catch (error) {
            setApproveMatchError(error.message);
        }
        setIsApprovingMatch(false);
    };
    return {
        approveMatch,
        isApprovingMatch,
        approveMatchError,
    };
};

const useDenyMatch = () => {
    const dispatch = useDispatch();
    const [isDenyingMatch, setIsDenyingMatch] = useState(false);
    const [denyMatchError, setDenyMatchError] = useState<string | undefined>(undefined);

    const denyMatch = async (matchId: string) => {
        setIsDenyingMatch(true);
        setDenyMatchError(undefined);
        try {
            await MatchesApi.denyMatch(matchId);
            dispatch(removeRankingFromPatient(matchId));
        } catch (error) {
            setDenyMatchError(error.message);
        }
        setIsDenyingMatch(false);
    };
    return {
        denyMatch,
        isDenyingMatch,
        denyMatchError,
    };
};

const useCreateMatch = () => {
    const [isCreatingMatch, setIsCreatingMatch] = useState(false);
    const [createMatchError, setCreateMatchError] = useState<string | undefined>(undefined);

    const createMatch = async (matchOptions: createMatchOptions) => {
        setIsCreatingMatch(true);
        setCreateMatchError(undefined);
        try {
            await MatchesApi.createMatch(matchOptions);
        } catch (error) {
            setCreateMatchError(error.message);
        }
        setIsCreatingMatch(false);
    };
    return {
        createMatch,
        isCreatingMatch,
        createMatchError,
    };
};

const useListProviders = () => {
    const [providers, setProviders] = useState<MatchTypes.Provider[]>([]);
    const [isLoadingProviders, setIsLoadingProviders] = useState(false);
    const [listProvidersError, setListProvidersError] = useState<string | undefined>(undefined);
    const listProviders = async (queryParams: Record<string, string> | undefined = {}) => {
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const query = queryString === '' ? '' : `?${queryString}`;
        setListProvidersError(undefined);
        setIsLoadingProviders(true);
        try {
            const results = await MatchesApi.listProviders(query);
            setProviders(results);
        } catch (error) {
            setListProvidersError(error.message);
        }
        setIsLoadingProviders(false);
    };
    return { providers, listProviders, isLoadingProviders, listProvidersError };
};
