import { AlertTypes } from '@therify/ui';

export type Alert = ICreateAlertProps & {
    id: number;
    isViewed: boolean;
};

export interface ICreateAlertProps {
    message: string;
    type: AlertTypes;
    autoHideDurationInMs?: number | null;
}
