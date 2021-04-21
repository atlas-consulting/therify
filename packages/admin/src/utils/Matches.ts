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
