import { MatchTypes } from '@therify/types';
import { RankingStatus } from '@therify/types/lib/match';
type MatchQualityOptions = { user: MatchTypes.User; provider: MatchTypes.Provider };
export type MatchCompatibilityStatus = { status: RankingStatus; reasons?: string[] };
export const getIncompatibleReasons = ({ user, provider }: MatchQualityOptions) => {
    const incompatibleReasons = [];
    if (!provider.licensedStates.includes(user.stateOfResidence)) {
        incompatibleReasons.push(`Cannot practice in ${user.stateOfResidence}`);
    }
    return incompatibleReasons.length ? incompatibleReasons : undefined;
};
const noPreference = (preference: string) => preference === "Don't Care";
export const getPreferenceIssues = ({ user, provider }: MatchQualityOptions) => {
    const { racePreference, genderPreference, issues, insuranceProvider } = user;
    const { acceptedInsurance, race: providerRace, gender: providerGender, specialties } = provider;
    const hasInsurance = insuranceProvider !== "I don't have insurance";
    const isInNetwork = hasInsurance && acceptedInsurance.includes(insuranceProvider);
    const providerAcceptsOutOfNetwork = acceptedInsurance.includes('Out of Network');
    const preferenceIssues = [];
    if (!providerRace.includes(racePreference) && !noPreference(racePreference)) {
        preferenceIssues.push(`Race: Not ${racePreference}`);
    }
    if (providerGender !== genderPreference && !noPreference(genderPreference)) {
        preferenceIssues.push(`Gender: Not ${genderPreference}`);
    }
    if (!isInNetwork && !providerAcceptsOutOfNetwork) {
        preferenceIssues.push('Out of Network');
    }
    const specialtyMismatches = issues.filter((issue) => !specialties.includes(issue));
    if (specialtyMismatches.length) {
        preferenceIssues.push(`Doesn't treat ${specialtyMismatches.join(', ')}`);
    }
    return preferenceIssues.length ? preferenceIssues : undefined;
};
export const generatePreferenceString = (user: MatchTypes.User) => {
    const { racePreference, genderPreference, issues } = user;

    const race = noPreference(racePreference) ? '' : racePreference;
    const gender = noPreference(genderPreference) ? '' : genderPreference;
    const noun = `${race} ${gender} providers`.trim();
    // TODO add 'or' to last issue
    return `User prefers ${noun} who specialize in ${issues.join(', ') || 'anything'}`;
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

export const getProviderToUserCompatability = (combination: MatchQualityOptions): MatchCompatibilityStatus => {
    let status = RankingStatus.GOOD;
    const incompatibleReasons = getIncompatibleReasons(combination);
    const preferenceIssues = getPreferenceIssues(combination);
    if (incompatibleReasons) status = RankingStatus.INCOMPATIBLE;
    else if (preferenceIssues) status = RankingStatus.WARNING;
    return {
        status,
        reasons: incompatibleReasons ?? preferenceIssues,
    };
};
