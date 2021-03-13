import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'therify-lambdas',
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
        serverlessOffline: {
            useDocker: true,
        },
    },
    // Add the serverless-webpack plugin
    plugins: ['serverless-webpack', 'serverless-offline'],
    provider: {
        name: 'aws',
        stage: "${opt:stage,'dev'}",
        region: "${opt:region,'us-east-1'}",
        runtime: 'nodejs12.x',
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
    },
    functions: {
        hello: {
            handler: 'handler.hello',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'hello',
                    },
                },
            ],
        },
    },
};

module.exports = serverlessConfiguration;
