import { MatchTypes } from '@therify/types';
import { mockModelResultsList } from './mocks/RankingResult';

export type getMatchesOptions = {
    token: string;
};

const MatchesApiCreator = () => {
    const getMatches = async (options: getMatchesOptions) => {
        return await new Promise<MatchTypes.Match[]>((resolve) =>
            setTimeout(() => resolve(mockModelResultsList), 2000),
        );
    };
    return { getMatches };
};

export const MatchesApi = MatchesApiCreator();
