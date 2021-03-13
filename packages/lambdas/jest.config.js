module.exports = {
    globals: {
        'ts-jest': {
            compiler: 'ttypescript',
        },
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    setupFiles: ['<rootDir>setupTests.ts'],
};
