const got = require('got');

const Logger = require('../logger');
const config = require('../config');

class Otc {
    constructor() {
        this.exchangeRate = config.exchangeRate;
    }

    async getRate() {
        const { appId, host } = this.exchangeRate;
        const url = `${host}/v1/data/trade-market?coinId=2&currency=1&tradeType=sell&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=`;
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

module.exports = Otc;
