import React from 'react';
import { Box, Paper, Theme, useTheme, withStyles } from '@material-ui/core';
import { Checkbox, TextSmall, Text } from '../../core';
import { Header3 } from '../../core';
import { ProviderRanking } from '../provider-ranking';
import { Patient, Ranking, RankingStatus } from '@therify/types/lib/match';
import { PreferencesGrid } from '../preferences-grid';

export type MatchesCardProps = {
    isChecked: boolean;
    onCheck: () => void;
    patient: Patient;
    rankings: (Ranking & { status: RankingStatus })[];
    handleApprove: (matchId: string) => Promise<void>;
    handleCancelApprove?: ({ patient, ranking }: { patient: Patient; ranking: Ranking }) => void;
    handleDeleteMatch?: (id: string) => void;
    handleCreateMatch?: () => void;
};
export const MatchesCard = ({
    isChecked,
    onCheck,
    patient,
    rankings,
    handleApprove,
    handleCancelApprove,
    handleDeleteMatch,
    handleCreateMatch,
}: MatchesCardProps) => {
    const theme = useTheme();
    const { email, company, preferences } = patient;
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
            <Checkbox data-testid="patient-card-checkbox" checked={isChecked} onClick={onCheck} />
            <Box flexGrow="1" style={{ paddingLeft: theme.spacing(3) }}>
                <TextSmall>{company}</TextSmall>
                <Header3>{email}</Header3>
                <TextSmall style={{ paddingTop: theme.spacing(1) }}>Provider Preferences</TextSmall>
                <PreferencesGrid preferences={preferences} />
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
                            displayText={ranking.provider.name}
                            rank={i + 1}
                            onApprove={() => handleApprove(ranking.id)}
                            onCancel={handleCancelApprove ? () => handleCancelApprove({ ranking, patient }) : undefined}
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
