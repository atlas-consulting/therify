import { MatchTypes } from '@therify/types';

const isIncompatible = (match: MatchTypes.Match) => true;
const hasIssues = (match: MatchTypes.Match) => true;

export const getMatchQualities = (matches: MatchTypes.Match[]) => {
    return matches.reduce<{
        rankings: MatchTypes.Match[];
        warnings: MatchTypes.Match[];
        incompatibilies: MatchTypes.Match[];
    }>(
        (matchAcc, match) => {
            if (isIncompatible(match)) {
                matchAcc.incompatibilies.push(match);
            } else if (hasIssues(match)) {
                matchAcc.warnings.push(match);
            } else {
                matchAcc.rankings.push(match);
            }
            return matchAcc;
        },
        { rankings: [], warnings: [], incompatibilies: [] },
    );
};
