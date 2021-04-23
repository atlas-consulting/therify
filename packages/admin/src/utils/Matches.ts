import { MatchTypes } from '@therify/types';
import { RankingStatus } from '@therify/types/lib/match';
type MatchQualityOptions = { user: MatchTypes.User; provider: MatchTypes.Provider };
const isIncompatible = ({ user, provider }: MatchQualityOptions) => false;
const hasIssues = ({ user, provider }: MatchQualityOptions) => false;

export const getRankingStatus = (comparison: MatchQualityOptions) => {
    if (isIncompatible(comparison)) {
        return RankingStatus.INCOMPATIBLE;
    }
    if (hasIssues(comparison)) {
        return RankingStatus.WARNING;
    }
    return RankingStatus.GOOD;
};

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
