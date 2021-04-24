import { MatchTypes } from '@therify/types';

export const removeDeniedRankings = (
    matches: MatchTypes.Match[],
    deniedRankingIds: Set<string>,
): MatchTypes.Match[] => {
    return matches.map((match) => removeDeniedRankingsFromMatch(match, deniedRankingIds));
};

export const removeDeniedRankingsFromMatch = (
    match: MatchTypes.Match,
    deniedRankingIds: Set<string>,
): MatchTypes.Match => ({
    ...match,
    matches: match.matches.filter((ranking) => !deniedRankingIds.has(ranking.id)),
});
