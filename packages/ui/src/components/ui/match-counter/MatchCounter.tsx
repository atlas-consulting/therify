import { Box, useTheme } from '@material-ui/core';
import { MatchTypes } from '@therify/types';
import { Text } from '../../core/typography';
import React from 'react';
export type MatchCounterProps = {
    matches: MatchTypes.Match[];
};
// TODO: determine how to check matches
const hasIssues = (match: MatchTypes.Match) => !!match.hasIssues;
const isIncompatible = (match: MatchTypes.Match) => !!match.isIncompatible;
const separateMatchQualities = (matches: MatchTypes.Match[]) => {
    return matches.reduce(
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
export const MatchCounter = ({ matches }: MatchCounterProps) => {
    const theme = useTheme();
    const { rankings, warnings, incompatibilies } = separateMatchQualities(matches);
    return (
        <Box>
            <Text data-testid="match-counter-rankings" display="inline" style={{ marginRight: theme.spacing(2) }}>
                <span style={{ color: theme.palette.success.main }}>{rankings.length}</span> ranking
                {rankings.length === 1 ? '' : 's'}
            </Text>
            <Text data-testid="match-counter-warnings" display="inline" style={{ marginRight: theme.spacing(2) }}>
                <span style={{ color: theme.palette.warning.main }}>{warnings.length}</span> warning
                {warnings.length === 1 ? '' : 's'}
            </Text>
            <Text data-testid="match-counter-incompatibilies" display="inline" style={{ marginRight: theme.spacing(2) }}>
                <span style={{ color: theme.palette.error.main }}>{incompatibilies.length}</span> incompatibilit
                {incompatibilies.length === 1 ? 'y' : 'ies'}
            </Text>
        </Box>
    );
};
