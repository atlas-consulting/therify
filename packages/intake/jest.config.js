module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            compiler: 'ttypescript',
        },
    },
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    setupFiles: ['<rootDir>setupTests.ts'],
};
