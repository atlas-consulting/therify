import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MatchCounter } from './MatchCounter';
import '@testing-library/jest-dom/extend-expect';
import { MatchTypes } from '@therify/types';

const mockMatch = {} as MatchTypes.Match;

describe('MatchCounter', () => {
    afterEach(cleanup);
    it('renders successfully', () => {
        const { container } = render(<MatchCounter good={[]} incompatibilities={[]} warnings={[]} />);
        expect(container.childElementCount).toBe(1);
    });

    it('detects incompatibile matches', () => {
        const { getByTestId } = render(<MatchCounter good={[]} incompatibilities={[mockMatch]} warnings={[]} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        expect(incompatibilies).toHaveTextContent('1 incompatibility');
    });

    it('detects good matches', () => {
        const { getByTestId } = render(<MatchCounter good={[mockMatch]} incompatibilities={[]} warnings={[]} />);
        const goodRankings = getByTestId('match-counter-rankings');
        expect(goodRankings).toHaveTextContent('1 ranking');
    });
    // TODO: move to @admin-ui utils
    // it('detects problematic matches', () => {
    //     const { getByTestId } = render(<MatchCounter matches={[mockIssuesMatch]} />);
    //     const warnings = getByTestId('match-counter-warnings');
    //     expect(warnings).toHaveTextContent('1 warning');
    // });

    it('should use singular nouns when one match type found', () => {
        const { getByTestId } = render(
            <MatchCounter good={[mockMatch]} incompatibilities={[mockMatch]} warnings={[mockMatch]} />,
        );
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        const rankings = getByTestId('match-counter-rankings');
        const warnings = getByTestId('match-counter-warnings');
        expect(rankings).toHaveTextContent('ranking');
        expect(incompatibilies).toHaveTextContent('incompatibility');
        expect(warnings).toHaveTextContent('warning');
    });

    it('should use plural nouns when appropriate', () => {
        const { getByTestId } = render(<MatchCounter good={[]} incompatibilities={[]} warnings={[]} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        const rankings = getByTestId('match-counter-rankings');
        const warnings = getByTestId('match-counter-warnings');
        expect(rankings).toHaveTextContent('rankings');
        expect(incompatibilies).toHaveTextContent('incompatibilities');
        expect(warnings).toHaveTextContent('warnings');
    });
});
