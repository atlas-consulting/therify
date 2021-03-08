import React from 'react';
import { RankingStatus } from '@therify/types/lib/match';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ProviderRanking as ProviderRankingUi } from './ProviderRanking';

export const PatientCard: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            onApprove={async () => alert('Approved')}
            onDelete={async () => alert('Deleted!')}
            rank={1}
            displayText="Dr. Test Jenkins"
            status={RankingStatus.GOOD}
        />
    );
};
export const Warning: Story = () => {
    return (
        <ProviderRankingUi
            id="tests"
            rank={1}
            displayText="Dr. Test Jenkins"
            statusText="Gender: Male"
            status={RankingStatus.WARNING}
            onApprove={async () => alert('Approved')}
            onDelete={async () => alert('Deleted!')}
        />
    );
};
export const Incompatible: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            rank={1}
            displayText="Dr. Test Jenkins"
            statusText="Out of Network"
            status={RankingStatus.INCOMPATIBLE}
            onApprove={async () => alert('Approved')}
            onDelete={async () => alert('Deleted!')}
        />
    );
};
export const NoDelete: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            rank={1}
            displayText="Dr. Test Jenkins"
            status={RankingStatus.GOOD}
            onApprove={async () => {}}
        />
    );
};

export const NoApprove: Story = () => {
    return <ProviderRankingUi id="test" rank={1} displayText="Dr. Test Jenkins" status={RankingStatus.GOOD} />;
};

export const NoRank: Story = () => {
    return <ProviderRankingUi id="test" displayText="Dr. Test Jenkins" status={RankingStatus.GOOD} />;
};

export default {
    title: 'Ui/ProviderRanking',
} as Meta;
