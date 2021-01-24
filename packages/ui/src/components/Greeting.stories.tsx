import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Greeting, GreetingProps } from './Greeting';

export default {
    title: 'Example/Greeting',
    component: Greeting,
    argTypes: {
        message: { control: 'text' },
    },
} as Meta;

const Template: Story<GreetingProps> = (args) => <Greeting {...args} />;




export const Default = Template.bind({});
Default.args = {
    message: "This is neat!"
};
