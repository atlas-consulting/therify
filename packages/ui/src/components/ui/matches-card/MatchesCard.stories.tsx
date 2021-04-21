import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Mocks } from '@therify/types';
import { MatchesCard as MatchesCardUi } from './MatchesCard';
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
        specialties: 'Stress',
    },
};

const mockRanking = {
    ...Mocks.mockRanking,
    status: RankingStatus.GOOD,
};

export const MatchesCard: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <MatchesCardUi
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
        <MatchesCardUi
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
    title: 'Ui/MatchesCard',
} as Meta;
