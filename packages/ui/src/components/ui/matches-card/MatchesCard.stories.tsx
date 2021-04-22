import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Mocks } from '@therify/types';
import { MatchesCard as MatchesCardUi } from './MatchesCard';
import { RankingStatus } from '@therify/types/lib/match';

const mockRankingWithStatus = {
    ...Mocks.mockRanking,
    status: RankingStatus.GOOD,
};

export const MatchesCard: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <MatchesCardUi
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            user={Mocks.mockUser}
            rankings={[
                { ...mockRankingWithStatus, id: '1' },
                { ...mockRankingWithStatus, id: '2' },
                { ...mockRankingWithStatus, id: '3' },
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
            user={Mocks.mockUser}
            rankings={[
                { ...mockRankingWithStatus, id: '1' },
                { ...mockRankingWithStatus, id: '2' },
                { ...mockRankingWithStatus, id: '3' },
            ]}
            handleApprove={async () => {}}
        />
    );
};

export default {
    title: 'Ui/MatchesCard',
} as Meta;
