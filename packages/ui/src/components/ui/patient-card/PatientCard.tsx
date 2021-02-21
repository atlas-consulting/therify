import { Box, Paper, Theme, useTheme, withStyles } from '@material-ui/core';
import { Checkbox, TextSmall, Text } from '../../';
import React from 'react';
import { Header3 } from '../../core';
import { ProviderRanking, RankingStatus } from '../provider-ranking';
// TODO: Move these to @types
type ProviderAttributes = {
    state: string;
    network: string;
    gender: string;
    race: string;
    specialty: string;
}
export type Patient = {
    email: string;
    id: string;
    company: string;
    preferences: ProviderAttributes;
};

export type Ranking = {
    id: string,
    provider: {name: string} & ProviderAttributes,
    status: RankingStatus,
    onApprove: () => Promise<unknown>,
};

export type PatientCardProps = {
    isChecked: boolean;
    onCheck: () => void;
    patient: Patient;
    rankings: Ranking[];
};
export const PatientCard = ({ isChecked, onCheck, patient, rankings }: PatientCardProps) => {
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
            }}
        >
            <Checkbox data-testid="patient-card-checkbox" checked={isChecked} onClick={onCheck} />
            <Box flexGrow="1" style={{ paddingLeft: theme.spacing(3) }}>
                <TextSmall>{company}</TextSmall>
                <Header3>{email}</Header3>
                <TextSmall style={{ paddingTop: theme.spacing(1) }}>Provider Preferences</TextSmall>
                <Box display="flex" flexWrap="wrap">
                    {/* TODO: look into cols for preferences */}
                    <TextSmall style={{ flexGrow: 3 }}>
                        <b>State: </b>
                        {preferences.state}
                    </TextSmall>
                    <TextSmall style={{ flexGrow: 3 }}>
                        <b>Gender: </b>
                        {preferences.gender}
                    </TextSmall>
                    <TextSmall style={{ flexGrow: 3 }}>
                        <b>Specialty: </b>
                        {preferences.specialty}
                    </TextSmall>
                    <TextSmall style={{ flexGrow: 3 }}>
                        <b>Network: </b>
                        {preferences.network}
                    </TextSmall>
                    <TextSmall style={{ flexGrow: 3 }}>
                        <b>Race: </b>
                        {preferences.race}
                    </TextSmall>
                </Box>
            </Box>
            <Box flexGrow="2" style={{ paddingLeft: theme.spacing(3) }}>
                <TextSmall style={{marginLeft: theme.spacing(5)}}>Matches</TextSmall>
                {
                    rankings.length === 0 
                    ? <Text style={{opacity: .7}}>No rankings to show.</Text> 
                    : rankings.map((ranking, i) => <ProviderRanking key={ranking.id} id={ranking.id} status={ranking.status} providerName={ranking.provider.name} rank={i + 1} onApprove={ranking.onApprove}/>)
                }   
                <TextButton>+ Add Provider</TextButton>
            </Box>
        </Paper>
    );
};

const makeTextButton = (theme: Theme) => withStyles({
        root: {
            opacity: .7,
            cursor: 'pointer',
            marginLeft: theme.spacing(5),
            transition: '200ms',
            '&:hover': {
                opacity: 1,
                fontWeight: 500,
                color: theme.palette.primary.main,
            }
        }
    })(TextSmall);