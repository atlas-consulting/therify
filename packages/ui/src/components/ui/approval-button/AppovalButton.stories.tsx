import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ApprovalButton as ApprovalButtonUi } from './ApprovalButton';

export const ApprovalButton: Story = () => {
    return (
        <ApprovalButtonUi
            rankingId="test"
            onApprove={() =>
                new Promise((r) =>
                    setTimeout(() => {
                        r(console.log('Approved!'));
                    }, 1000),
                )
            }
        />
    );
};

export default {
    title: 'Ui/ApprovalButton',
} as Meta;
