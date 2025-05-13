export const config = {
    runner: 'local',
    specs: ['./tests/specs/**/*.ts'],
    exclude: [],

    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome'
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:5174',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['chromedriver'], // chromedriver service kullanımı

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
