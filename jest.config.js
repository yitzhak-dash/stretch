module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    preset: 'ts-jest',
    testMatch: [
        '**/test/**/*.test.(ts|js)',
    ],
    testEnvironment: 'node',
};
