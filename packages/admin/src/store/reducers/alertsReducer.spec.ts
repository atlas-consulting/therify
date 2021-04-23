import { AlertTypes } from '@therify/ui';
import { Alert, ICreateAlertProps } from '../../models';
import { setAlert, setAlertViewed, AlertsActionType } from '../actions';
import alertsReducer, { AlertsStore } from './alertsReducer';

const mockState: AlertsStore = {
    alerts: [],
    idCounter: 1,
};
const mockAlert: ICreateAlertProps = {
    message: 'hello',
    type: AlertTypes.Info,
};

describe('alerts reducer', () => {
    it('should return default state', () => {
        const type = '' as AlertsActionType;
        expect(alertsReducer(mockState, { type, payload: undefined })).toStrictEqual(mockState);
    });

    it('should increment idCounter in state when alert added', () => {
        const action = setAlert(mockAlert);
        const updatedState = alertsReducer(mockState, action);
        expect(updatedState.idCounter).toBe(mockState.idCounter + 1);
    });

    it('should set a new alert to state', () => {
        const action = setAlert(mockAlert);
        const updatedState = alertsReducer(mockState, action);
        expect(updatedState.alerts).toStrictEqual([{ ...mockAlert, isViewed: false, id: mockState.idCounter }]);
    });

    it('should set an alert to viewed in state', () => {
        const action = setAlertViewed(0);
        const updatedState = alertsReducer(
            { ...mockState, alerts: [{ ...mockAlert, isViewed: false, id: 0 }] },
            action,
        );
        expect(updatedState).toStrictEqual({
            ...mockState,
            alerts: [{ ...mockAlert, id: 0, isViewed: true }],
        });
    });
});
