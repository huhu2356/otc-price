const got = require('got');

const Logger = require('../logger');
const config = require('../config');

class ExchangeRate {
    constructor() {
        this.exchangeRate = config.exchangeRate;
    }

    async handler() {
        const { appId, host } = this.exchangeRate;
        const url = `${host}/api/latest.json?app_id=${appId}`;
        try {
            const { body } = await got.get(url, {
                responseType: 'json',
            });
            const { base, rates } = body;

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
