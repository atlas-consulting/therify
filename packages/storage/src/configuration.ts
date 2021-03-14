import { get } from 'env-var';

const AWS_REGION = 'AWS_REGION';
const STAGE = 'STAGE';
const APPLICATION_NAME = 'APPLICATION_NAME';
const CLIENT_INTAKE_BUCKET_NAME = 'CLIENT_INTAKE_BUCKET_NAME';

export interface StorageConfiguration {
    AWS_REGION: string;
    STAGE: string;
    APPLICATION_NAME: string;
    CLIENT_INTAKE_BUCKET_NAME: string;
}

export const getConfig = (): StorageConfiguration => ({
    AWS_REGION: get(AWS_REGION).required().asString(),
    STAGE: get(STAGE).required().asString(),
    APPLICATION_NAME: get(APPLICATION_NAME).required().asString(),
    CLIENT_INTAKE_BUCKET_NAME: get(CLIENT_INTAKE_BUCKET_NAME).required().asString(),
});
