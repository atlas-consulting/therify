import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MatchCounter } from './MatchCounter';
import '@testing-library/jest-dom/extend-expect'

const mockIncompatibleMatch = { isIncompatible: true };
const mockIssuesMatch = { hasIssues: true };
const mockGoodMatch = { };
describe('MatchCounter', () => {
    afterEach(cleanup)
    it('renders successfully', () => {
        const {container} = render(<MatchCounter matches={[]} />)
        expect(container.childElementCount).toBe(1);
    });

    it('detects incompatibile matches', () => {
        const { getByTestId } = render(<MatchCounter matches={[mockIncompatibleMatch]} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        expect(incompatibilies).toHaveTextContent('1 incompatibility');
    });

    it('detects rankings matches', () => {
        const { getByTestId } = render(<MatchCounter matches={[mockGoodMatch]} />);
        const rankings = getByTestId('match-counter-rankings');
        expect(rankings).toHaveTextContent('1 ranking');
    });

    it('detects problematic matches', () => {
        const { getByTestId } = render(<MatchCounter matches={[mockIssuesMatch]} />);
        const warnings = getByTestId('match-counter-warnings');
        expect(warnings).toHaveTextContent('1 warning');
    });
    
    it('should use singular nouns when one match type found', () => {
        const { getByTestId } = render(<MatchCounter matches={[mockIncompatibleMatch, mockGoodMatch, mockIssuesMatch]} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        const rankings = getByTestId('match-counter-rankings');
        const warnings = getByTestId('match-counter-warnings');
        expect(rankings).toHaveTextContent('ranking');
        expect(incompatibilies).toHaveTextContent('incompatibility'); 
        expect(warnings).toHaveTextContent('warning');
    });
   
    it('should use plural nouns when appropriate', () => {
        const { getByTestId } = render(<MatchCounter matches={[]} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        const rankings = getByTestId('match-counter-rankings');
        const warnings = getByTestId('match-counter-warnings');
        expect(rankings).toHaveTextContent('rankings');
        expect(incompatibilies).toHaveTextContent('incompatibilities'); 
        expect(warnings).toHaveTextContent('warnings');
    });

});
// match - counter - rankings;
// match - counter - warnings;
