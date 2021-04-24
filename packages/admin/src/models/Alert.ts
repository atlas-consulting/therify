import { AlertTypes } from '@therify/ui';

export type Alert = ICreateAlertProps & IAlertMeta;

export interface IAlertMeta {
    id: number;
    isViewed: boolean;
}

export interface ICreateAlertProps {
    message: string;
    type: AlertTypes;
    autoHideDurationInMs?: number | null;
}
