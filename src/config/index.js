const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    env: process.env.NODE_ENV,

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    exchangeRate: {
        host: 'https://openexchangerates.org',
        appId: process.env.EXCHANGE_RATES_APP_ID,
    },
};
