import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PatientCard as PatientCardUi } from './PatientCard';
import { RankingStatus } from '@therify/types/lib/match';

const mockPatient = {
    email: 'test@storybook.com',
    id: '123',
    company: 'Therify',
    preferences: {
        state: 'TN',
        network: 'Cigna',
        gender: 'male',
        race: 'No ',
        specialty: 'Stress',
    },
};

const mockRanking = {
    id: 'test',
    provider: {
        name: 'Dr. Test Jackson',
        state: 'TN',
        network: 'Cigna',
        gender: 'male',
        race: 'No ',
        specialty: 'Stress',
    },
    onApprove: async () => {},
    status: RankingStatus.GOOD,
};

export const PatientCard: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <PatientCardUi
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            patient={mockPatient}
            rankings={[
                { ...mockRanking, id: '1' },
                { ...mockRanking, id: '2' },
                { ...mockRanking, id: '3' },
            ]}
            handleApprove={async () => {}}
            handleCreateMatch={() => {}}
        />
    );
};
export const NoMatchCreation: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <PatientCardUi
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            patient={mockPatient}
            rankings={[
                { ...mockRanking, id: '1' },
                { ...mockRanking, id: '2' },
                { ...mockRanking, id: '3' },
            ]}
            handleApprove={async () => {}}
        />
    );
};

export default {
    title: 'Ui/PatientCard',
} as Meta;
