import { IAlert } from '../../models';
import { AlertsStore } from '../reducers/alertsReducer';
// import { getDeniedRankingIds, getMatches, getMatchesState } from './matchesSelector';/
import { getAlerts, getUnreadAlerts } from './alertsSelector';

const mockAlert: IAlert = { id: 0, isViewed: false };
const mockStore: { alertsStore: AlertsStore } = {
    alertsStore: {
        alerts: [],
        idCounter: 1,
    },
};
describe('alertsSelector', () => {
    describe('getAlerts', () => {
        it('should return alerts array', () => {
            expect(getAlerts(mockStore)).toStrictEqual([]);
        });
    });

    describe('getUnreadAlerts', () => {
        it('should return only unread alerts', () => {
            const store = {
                alertsStore: {
                    ...mockStore.alertsStore,
                    alerts: [
                        { ...mockAlert, id: 0, isViewed: false },
                        { ...mockAlert, id: 1, isViewed: true },
                    ],
                },
            };
            expect(getUnreadAlerts(store)).toStrictEqual([{ ...mockAlert, id: 0, isViewed: false }]);
        });
    });
});
