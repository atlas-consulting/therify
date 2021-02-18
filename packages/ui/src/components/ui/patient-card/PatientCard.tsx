import { Box, Paper, useTheme } from '@material-ui/core';
import { Checkbox, TextSmall } from '../../';
import React from 'react';
import { Header3 } from '../../core';
export type Patient = {
    email: string;
    id: string;
    company: string;
    preferences: {
        state: string;
        network: string;
        gender: string;
        race: string;
        specialty: string;
    };
};

export type Ranking = {};

export type PatientCardProps = {
    isChecked: boolean;
    onCheck: () => void;
    patient: Patient;
    rankings: Ranking[];
};
export const PatientCard = ({ isChecked, onCheck, patient }: PatientCardProps) => {
    const theme = useTheme();
    const { email, company, preferences } = patient;
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
            <Box flexGrow="2" style={{ paddingLeft: theme.spacing(3) }}>
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
                <TextSmall>Matches</TextSmall>
            </Box>
        </Paper>
    );
};
