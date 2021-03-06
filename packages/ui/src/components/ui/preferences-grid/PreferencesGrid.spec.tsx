import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PreferencesGrid } from './PreferencesGrid';

const mockPreferences = {
    state: 'TN',
    network: 'Cigna',
    gender: 'male',
    race: 'No preference',
    specialty: 'Stress',
};

describe('PreferencesGrid', () => {
    it('should render preferences data', () => {
        const { getByText } = render(<PreferencesGrid preferences={mockPreferences} />);
        expect(getByText(mockPreferences.state)).toBeInTheDocument();
        expect(getByText(mockPreferences.network)).toBeInTheDocument();
        expect(getByText(mockPreferences.gender)).toBeInTheDocument();
        expect(getByText(mockPreferences.race)).toBeInTheDocument();
        expect(getByText(mockPreferences.specialty)).toBeInTheDocument();
    });
});
