import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MatchesCard } from './MatchesCard';

const mockPatient = {
    email: 'test@storybook.com',
    id: '123',
    company: 'Therify',
    preferences: {
        state: 'TN',
        network: 'Cigna',
        gender: 'male',
        race: 'No preference',
        specialty: 'Stress',
    },
};

describe('MatchesCard', () => {
    it('should render patient data', () => {
        const { getByText } = render(
            <MatchesCard isChecked={false} onCheck={() => {}} patient={mockPatient} rankings={[]} />,
        );
        expect(getByText(mockPatient.email)).toBeInTheDocument();
        expect(getByText(mockPatient.company)).toBeInTheDocument();
        expect(getByText(mockPatient.preferences.state)).toBeInTheDocument();
        expect(getByText(mockPatient.preferences.network)).toBeInTheDocument();
        expect(getByText(mockPatient.preferences.gender)).toBeInTheDocument();
        expect(getByText(mockPatient.preferences.race)).toBeInTheDocument();
        expect(getByText(mockPatient.preferences.specialty)).toBeInTheDocument();
    });

    it('should call `onCheck` when checkbox clicked', () => {
        const handleCheck = jest.fn();
        const { getByTestId } = render(
            <MatchesCard isChecked={false} onCheck={handleCheck} patient={mockPatient} rankings={[]} />,
        );
        const checkbox = getByTestId('patient-card-checkbox');
        fireEvent.click(checkbox);
        expect(handleCheck).toHaveBeenCalled();
    });
});
