import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PreferencesGrid as PreferencesGridUi } from './PreferencesGrid';
import { MatchTypes } from '@therify/types';

export const PreferencesGrid: Story = () => (
    <PreferencesGridUi
        preferences={
            {
                name: 'Dr. Test Jackson',
                state: 'TN',
                network: 'Cigna',
                gender: 'male',
                race: 'No ',
                specialties: 'Stress',
            } as MatchTypes.Features
        }
    />
);

export default {
    title: 'Ui/PreferencesGrid',
} as Meta;
