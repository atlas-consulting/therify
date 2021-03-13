import { APIGatewayProxyHandler } from 'aws-lambda';
import { FlowTypes } from '@therify/types';
export const handler: APIGatewayProxyHandler = async () => {
    console.log(`Executing ${FlowTypes.TherifyFlowStages.CLIENT_INTAKE} lambda`);
    return {
        statusCode: 200,
        body: 'ok',
    };
};
