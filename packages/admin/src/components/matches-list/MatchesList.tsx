import React from 'react';
import { Text, MatchesCard, ButtonFill as Button } from '@therify/ui';
import { useTheme, CircularProgress, Box } from '@material-ui/core';
import { useMatchesApi } from '../../hooks/useMatchesApi';

export type MatchesListProps = {
    handleApprove: (matchId: string) => Promise<void>;
    handleDeleteMatch: (id: string) => void;
    handleCreateMatch: () => void;
    onCheck: () => void;
    isLoading: boolean;
};
export const MatchesList = ({
    handleApprove,
    handleDeleteMatch,
    handleCreateMatch,
    onCheck,
    isLoading,
}: MatchesListProps) => {
    const { matches, getMatchesError, isLoadingMatches, getMatches } = useMatchesApi();
    const theme = useTheme();
    const ErrorContent = getMatchesError ? (
        <>
            <Text>Something went wrong: {getMatchesError}</Text>
            <Button onClick={getMatches}>Try again</Button>
        </>
    ) : undefined;
    const LoadingContent =
        isLoadingMatches || isLoading ? (
            <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
                <CircularProgress color="primary" />
            </Box>
        ) : undefined;

    const MatchesContent =
        matches.length === 0 ? (
            <Text>All caught up. No matches to show!</Text>
        ) : (
            matches.map(({ patient, matches }) => (
                <MatchesCard
                    key={patient.id}
                    isChecked={false}
                    onCheck={onCheck}
                    patient={patient}
                    rankings={matches}
                    handleApprove={handleApprove}
                    handleDeleteMatch={handleDeleteMatch}
                    handleCreateMatch={handleCreateMatch}
                />
            ))
        );
    return (
        <Box flexGrow={1} overflow="auto" style={{ padding: theme.spacing(3, 6), paddingBottom: 0 }}>
            {ErrorContent ?? LoadingContent ?? MatchesContent}
        </Box>
    );
};
