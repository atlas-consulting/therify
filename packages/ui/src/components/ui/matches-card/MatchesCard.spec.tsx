import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MatchesCard } from './MatchesCard';
import { MatchTypes, Mocks } from '@therify/types';
import { RankingStatus } from '@therify/types/lib/match';

describe('MatchesCard', () => {
    it('should render patient data', () => {
        const { getByText } = render(
            <MatchesCard
                handleApprove={async () => {}}
                isChecked={false}
                onCheck={() => {}}
                user={Mocks.mockUser}
                rankings={[]}
            />,
        );
        expect(getByText(Mocks.mockUser.emailAddress)).toBeInTheDocument();
        // expect(getByText(Mocks.mockUser.company)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.stateOfResidence)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.insuranceProvider)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.genderPreference)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.racePreference)).toBeInTheDocument();
        expect(getByText(Mocks.mockUser.issues[0])).toBeInTheDocument();
    });

    it('should call `onCheck` when checkbox clicked', () => {
        const handleCheck = jest.fn();
        const { getByTestId } = render(
            <MatchesCard
                isChecked={false}
                onCheck={handleCheck}
                user={Mocks.mockUser}
                rankings={[]}
                handleApprove={async () => {}}
            />,
        );
        const checkbox = getByTestId('user-card-checkbox');
        fireEvent.click(checkbox);
        expect(handleCheck).toHaveBeenCalled();
    });

    it('should render approval button when approvable rankings present', () => {
        const { getByText } = render(
            <MatchesCard
                isChecked={false}
                onCheck={() => {}}
                user={Mocks.mockUser}
                rankings={[{ ...Mocks.mockRanking, status: RankingStatus.GOOD }]}
                handleApprove={async () => {}}
            />,
        );
        const button = getByText('Approve');
        expect(button).toBeInTheDocument();
    });

    it('should NOT render approval button when no approvable rankings present', () => {
        const { getByText } = render(
            <MatchesCard
                isChecked={false}
                onCheck={() => {}}
                user={Mocks.mockUser}
                rankings={[{ ...Mocks.mockRanking, status: RankingStatus.INCOMPATIBLE }]}
                handleApprove={async () => {}}
            />,
        );
        const button = getByText('Approve');
        expect(button).toBeInTheDocument();
    });
});
