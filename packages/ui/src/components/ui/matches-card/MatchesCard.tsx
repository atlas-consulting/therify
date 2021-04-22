import React from 'react';
import { Box, Paper, Theme, useTheme, withStyles } from '@material-ui/core';
import { Checkbox, TextSmall, Text } from '../../core';
import { Header3 } from '../../core';
import { ProviderRanking } from '../provider-ranking';
import { MatchTypes } from '@therify/types';
import { PreferencesGrid } from '../preferences-grid';

export type MatchesCardProps = {
    isChecked: boolean;
    onCheck: () => void;
    user: MatchTypes.User;
    rankings: (MatchTypes.Ranking & { status: MatchTypes.RankingStatus })[];
    handleApprove: (matchId: string) => Promise<void>;
    handleCancelApprove?: ({ user, ranking }: { user: MatchTypes.User; ranking: MatchTypes.Ranking }) => void;
    handleDeleteMatch?: (id: string) => void;
    handleCreateMatch?: () => void;
};
export const MatchesCard = ({
    isChecked,
    onCheck,
    user,
    rankings,
    handleApprove,
    handleCancelApprove,
    handleDeleteMatch,
    handleCreateMatch,
}: MatchesCardProps) => {
    const theme = useTheme();
    const {
        emailAddress,
        // company,
        stateOfResidence,
        genderPreference,
        racePreference,
        issues,
        insuranceProvider,
    } = user;
    // TODO: Company should come from user
    const company = '';
    const TextButton = makeTextButton(theme);
    return (
        <Paper
            style={{
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(3),
                alignItems: 'flex-start',
                display: 'flex',
                marginBottom: theme.spacing(2),
            }}
        >
            <Checkbox data-testid="user-card-checkbox" checked={isChecked} onClick={onCheck} />
            <Box flexGrow="1" style={{ paddingLeft: theme.spacing(3) }}>
                <TextSmall>{company}</TextSmall>
                <Header3>{emailAddress}</Header3>
                <TextSmall style={{ paddingTop: theme.spacing(1) }}>Provider Preferences</TextSmall>
                <PreferencesGrid
                    stateOfResidence={stateOfResidence}
                    genderPreference={genderPreference}
                    racePreference={racePreference}
                    issues={issues}
                    insuranceProvider={insuranceProvider}
                />
            </Box>
            <Box flexGrow="2" style={{ paddingLeft: theme.spacing(3) }}>
                <TextSmall style={{ marginLeft: theme.spacing(5) }}>Matches</TextSmall>
                {rankings.length === 0 ? (
                    <Text style={{ opacity: 0.7 }}>No rankings to show.</Text>
                ) : (
                    rankings.map((ranking, i) => (
                        <ProviderRanking
                            key={ranking.id}
                            id={ranking.id}
                            status={ranking.status}
                            displayText={`${ranking.provider.firstName} ${ranking.provider.lastName}`}
                            rank={i + 1}
                            onApprove={() => handleApprove(ranking.id)}
                            onCancel={handleCancelApprove ? () => handleCancelApprove({ ranking, user }) : undefined}
                            onDelete={handleDeleteMatch}
                        />
                    ))
                )}
                {handleCreateMatch && <TextButton onClick={handleCreateMatch}>+ Add Provider</TextButton>}
            </Box>
        </Paper>
    );
};

const makeTextButton = (theme: Theme) =>
    withStyles({
        root: {
            opacity: 0.7,
            cursor: 'pointer',
            margin: 0,
            marginLeft: theme.spacing(5),
            transition: '200ms',
            '&:hover': {
                opacity: 1,
                fontWeight: 500,
                color: theme.palette.primary.main,
            },
        },
    })(TextSmall);
