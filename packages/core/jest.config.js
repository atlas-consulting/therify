module.exports = {
    globals: {
        'ts-jest': {
            compiler: 'ttypescript',
        },
    },
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>setupTests.ts'],
};
