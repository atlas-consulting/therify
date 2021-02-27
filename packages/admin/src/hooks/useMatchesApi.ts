import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MatchesApi } from '../api/MatchesApi';
import { setMatches } from '../store/actions';
import { getMatches as getMatchesState, getUserToken } from '../store/selectors';

export const useMatchesApi = () => {
    const dispatch = useDispatch();
    const matches = useSelector(getMatchesState);
    const token = useSelector(getUserToken);
    const [isLoadingMatches, setIsLoadingMatches] = useState(false);
    const [getMatchesError, setGetMatchesError] = useState<string | undefined>(undefined);

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
