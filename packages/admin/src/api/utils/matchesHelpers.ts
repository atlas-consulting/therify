import { MatchTypes, MatchApiTypes } from '@therify/types';

type MatchesMap = {
    users: Record<string, MatchApiTypes.IUser>;
    providers: Record<string, MatchTypes.Provider>;
    matchesByUserEmail: Record<string, Record<string, MatchApiTypes.IMatch>>;
};
export const adaptApiMatches = (rawMatches: MatchApiTypes.GetMatchesResponse[]): MatchTypes.Match[] => {
    const { users, providers, matchesByUserEmail } = createMatchesMap(rawMatches);
    return Object.values(users).map<MatchTypes.Match>((user) => {
        const {
            details: { emailAddress },
        } = user;
        const userMatches = matchesByUserEmail[emailAddress];
        const matches: MatchTypes.Ranking[] = Object.values(userMatches ?? {}).map((match) => ({
            id: match.PK,
            score: match.score,
            providerEmailAddress: match.providerEmailAddress,
            userEmailAddress: match.userEmailAddress,
            criteria: match.criteria,
            provider: providers[match.providerEmailAddress],
        }));
        return {
            user: user.details,
            matches,
        };
    });
};

function createMatchesMap(matches: MatchApiTypes.GetMatchesResponse[]): MatchesMap {
    return matches.reduce<MatchesMap>(
        (map, match) => {
            if (match.type === MatchApiTypes.ResponseType.Match) {
                if (map.matchesByUserEmail[match.userEmailAddress] === undefined) {
                    map.matchesByUserEmail[match.userEmailAddress] = {};
                }
                map.matchesByUserEmail[match.userEmailAddress][match.PK] = match as MatchApiTypes.IMatch;
            } else if (match.type === MatchApiTypes.ResponseType.Provider) {
                map.providers[match.details.emailAddress] = match.details;
            } else if (match.type === MatchApiTypes.ResponseType.User) {
                map.users[match.PK] = match as MatchApiTypes.IUser;
            } else {
                console.warn(`There was an unrecognized match`);
            }
            return map;
        },
        {
            users: {},
            providers: {},
            matchesByUserEmail: {},
        },
    );
}
