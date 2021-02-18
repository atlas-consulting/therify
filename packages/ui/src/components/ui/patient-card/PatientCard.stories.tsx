import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PatientCard as PatientCardUi } from './PatientCard';

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

export const PatientCard: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <PatientCardUi
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            patient={mockPatient}
            rankings={[]}
        />
    );
};

export default {
    title: 'Ui/PatientCard',
} as Meta;
