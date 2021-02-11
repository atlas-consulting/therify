export type getMatchesOptions = {
    userId: string;
};
// TODO: Mock up match objects
const mockMatches: any[] = [];
const MatchesApiCreator = () => {
    const getMatches = async (options: getMatchesOptions) => {
        return await new Promise((resolve) => setTimeout(() => resolve(mockMatches), 1000));
    };
    return { getMatches };
};

export const MatchesApi = MatchesApiCreator();
