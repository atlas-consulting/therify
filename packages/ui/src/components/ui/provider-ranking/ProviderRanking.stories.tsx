import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ProviderRanking as ProviderRankingUi, RankingStatus } from './ProviderRanking';

export const PatientCard: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            onApprove={async () => {}}
            rank={1}
            providerName="Dr. Test Jenkins"
            status={RankingStatus.GOOD}
        />
    );
};
export const Warning: Story = () => {
    return (
        <ProviderRankingUi
            id="tests"
            rank={1}
            providerName="Dr. Test Jenkins"
            statusText="Gender: Male"
            status={RankingStatus.WARNING}
            onApprove={async () => {}}
        />
    );
};
export const Incompatible: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            rank={1}
            providerName="Dr. Test Jenkins"
            statusText="Out of Network"
            status={RankingStatus.INCOMPATIBLE}
            onApprove={async () => {}}
        />
    );
};

export default {
    title: 'Ui/ProviderRanking',
} as Meta;
