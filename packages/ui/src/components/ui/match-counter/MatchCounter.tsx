import { Box, useTheme } from '@material-ui/core';
import { MatchTypes } from '@therify/types';
import { Text } from '../../core/typography';
import React from 'react';
export type MatchCounterProps = {
    good: MatchTypes.Match[];
    warnings: MatchTypes.Match[];
    incompatibilities: MatchTypes.Match[];
};

export const MatchCounter = ({ good, warnings, incompatibilities }: MatchCounterProps) => {
    const theme = useTheme();
    return (
        <Box>
            <Text data-testid="match-counter-rankings" display="inline" style={{ marginRight: theme.spacing(2) }}>
                <span style={{ color: theme.palette.success.main }}>{good.length}</span> ranking
                {good.length === 1 ? '' : 's'}
            </Text>
            <Text data-testid="match-counter-warnings" display="inline" style={{ marginRight: theme.spacing(2) }}>
                <span style={{ color: theme.palette.warning.main }}>{warnings.length}</span> warning
                {warnings.length === 1 ? '' : 's'}
            </Text>
            <Text
                data-testid="match-counter-incompatibilies"
                display="inline"
                style={{ marginRight: theme.spacing(2) }}
            >
                <span style={{ color: theme.palette.error.main }}>{incompatibilities.length}</span> incompatibilit
                {incompatibilities.length === 1 ? 'y' : 'ies'}
            </Text>
        </Box>
    );
};
