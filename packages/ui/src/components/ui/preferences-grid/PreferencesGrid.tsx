import React from 'react';
import { MatchTypes } from '@therify/types';
import { Grid } from '@material-ui/core';
import { TextSmall } from '../../core';

export type PreferencesGridProps = {
    preferences: MatchTypes.Features;
};

export const PreferencesGrid = ({ preferences }: PreferencesGridProps) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>State: </b>
                    {preferences.state}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>Gender: </b>
                    {preferences.gender}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>specialties: </b>
                    {preferences.specialties}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>Network: </b>
                    {preferences.network}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>Race: </b>
                    {preferences.race}
                </TextSmall>
            </Grid>
        </Grid>
    );
};
