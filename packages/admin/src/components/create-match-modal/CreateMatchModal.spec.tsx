import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser, mockProvider } from '../../api/mocks';
import { CreateMatchModal } from './CreateMatchModal';

describe('CreateMatchModal', () => {
    afterEach(cleanup);
    it('should render patient data', () => {
        const { getByText } = render(
            <CreateMatchModal
                selectedUser={mockUser}
                isOpen={true}
                isLoading={false}
                providers={[]}
                handleCreate={() => null}
                handleClose={() => null}
            />,
        );
        expect(getByText(mockUser.email)).toBeInTheDocument();
        const preferences = Object.values(mockUser.preferences);
        preferences.forEach((p) => expect(getByText(p)).toBeInTheDocument());
    });
    // TODO: FIX THESE TESTS
    // it('should call handleCreate', () => {
    //     const handleCreate = jest.fn();
    //     const { getByTestId } = render(
    //         <CreateMatchModal
    //             selectedUser={mockUser}
    //             isOpen={true}
    //             isLoading={false}
    //             providers={[]}
    //             handleCreate={handleCreate}
    //             handleClose={() => null}
    //         />,
    //     );
    //     const btn = getByTestId('create-btn');
    //     userEvent.click(btn);
    //     expect(btn).toBeInTheDocument();
    // });

    // it('should call handleClose', () => {
    //     const handleClose = jest.fn();
    //     const { getByTestId } = render(
    //         <CreateMatchModal
    //             selectedUser={mockUser}
    //             isOpen={true}
    //             isLoading={false}
    //             providers={[]}
    //             handleCreate={handleClose}
    //             handleClose={() => null}
    //         />,
    //     );
    //     const btn = getByTestId('cancel-btn');
    //     userEvent.click(btn);
    //     expect(handleClose).toHaveBeenCalled();
    // });

    // it('should render a ranking status when a provider selected', () => {
    //     const { getByTestId } = render(
    //         <CreateMatchModal
    //             selectedUser={mockUser}
    //             isOpen={true}
    //             isLoading={false}
    //             providers={[]}
    //             handleCreate={() => null}
    //             handleClose={() => null}
    //         />,
    //     );
    //     const autoSelect = getByTestId('provider-select');
    //     fireEvent.change(autoSelect);
    //     expect(getByTestId('provider-ranking')).toBeInTheDocument();
    // });
});
