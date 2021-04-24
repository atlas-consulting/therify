import React from 'react';
import { Box, Paper, Theme, useTheme, withStyles } from '@material-ui/core';
import { Checkbox, TextSmall, Text } from '../../core';
import { Header3 } from '../../core';
import { ProviderRanking } from '../provider-ranking';
import { MatchTypes } from '@therify/types';
import { PreferencesGrid } from '../preferences-grid';
import { ApprovalButton } from '../approval-button';
import { RankingStatus } from '@therify/types/lib/match';

export type MatchesCardProps = {
    isChecked: boolean;
    onCheck: () => void;
    user: MatchTypes.User;
    rankings: (MatchTypes.Ranking & { status: MatchTypes.RankingStatus; statusReason?: string })[];
    handleApprove: () => Promise<void>;
    handleCancelApprove?: () => void;
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
                    issues={(issues ?? []).join(', ')}
                    insuranceProvider={insuranceProvider}
                />
            </Box>
            <Box flexGrow="2">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    style={{ paddingBottom: theme.spacing(1) }}
                >
                    <TextSmall>Matches</TextSmall>
                    <ApprovalButton
                        isHidden={
                            rankings.length === 0 || rankings.every((r) => r.status === RankingStatus.INCOMPATIBLE)
                        }
                        onCancel={handleCancelApprove}
                        onApprove={handleApprove}
                        buttonText="Approve"
                    />
                </Box>
                {/* TODO: Disable Box while approving*/}
                <Box>
                    {rankings.length === 0 ? (
                        <Text style={{ opacity: 0.7 }}>No rankings to show.</Text>
                    ) : (
                        rankings.map((ranking, i) => (
                            <ProviderRanking
                                key={ranking.id}
                                id={ranking.id}
                                status={ranking.status}
                                statusText={ranking.statusReason}
                                displayText={`${ranking.provider.firstName} ${ranking.provider.lastName}`}
                                rank={i + 1}
                                onDelete={handleDeleteMatch}
                            />
                        ))
                    )}
                    {handleCreateMatch && <TextButton onClick={handleCreateMatch}>+ Add Provider</TextButton>}
                </Box>
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
