import React from 'react';
import { Alert as AlertUi } from '@therify/ui';
import { useAlerts } from '../../hooks/useAlerts';

export const AppNotification = () => {
    const { markAlertAsViewed, unreadAlerts } = useAlerts();
    const onDismiss = (id: number) => setTimeout(() => markAlertAsViewed(id), 400);
    return (
        <>
            {unreadAlerts.map((currentAlert) => (
                <AlertUi
                    message={currentAlert.message}
                    type={currentAlert.type}
                    autoHideDurationInMs={currentAlert.autoHideDurationInMs}
                    positionX="center"
                    positionY="bottom"
                    onDismiss={() => onDismiss(currentAlert.id)}
                />
            ))}
        </>
    );
};
