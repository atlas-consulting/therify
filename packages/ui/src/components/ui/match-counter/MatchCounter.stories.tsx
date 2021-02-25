import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MatchCounter as MatchCounterUi } from './MatchCounter';

export const MatchCounter: Story = () => <MatchCounterUi good={[]} warnings={[]} incompatibilities={[]} />;

export default {
    title: 'Ui/MatchCounter',
} as Meta;
