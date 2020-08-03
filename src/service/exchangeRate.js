const got = require('got');

const Logger = require('../logger');
const config = require('../config');

class ExchangeRate {
    constructor() {
        this.config = config.exchangeRate;
    }

    async getRate() {
        const { appId, host } = this.config;
        const url = `${host}/api/latest.json?app_id=${appId}`;
        try {
            const { body } = await got.get(url, {
                responseType: 'json',
            });
            const { base, rates } = body;

            Logger.info('ExchangeRate, url: %s, method: get, base: %s, rates: %O', url, base, rates);

            return {
                base,
                rates,
            };
        } catch (error) {
            Logger.error('ExchangeRate, url: %s, method: get, stack: %s', url, error.stack);

            throw error;
        }
    }
}

module.exports = ExchangeRate;
