const got = require('got');

const Logger = require('../logger');
const config = require('../config');

class Otc {
    constructor() {
        this.config = config.otc;
    }

    async getSellPrice() {
        const { host } = this.config;
        const url = `${host}/v1/data/trade-market?coinId=2&currency=1&tradeType=sell&currPage=1&payMethod=0&country=37&blockType=general&online=1&range=0&amount=`;
        try {
            const { body } = await got.get(url, {
                responseType: 'json',
            });
            const { data } = body;

            Logger.info('Otc, url: %s, method: get, data: %O', url, data);

            return { data };
        } catch (error) {
            Logger.error('Otc, url: %s, method: get, stack: %s', url, error.stack);

            throw error;
        }
    }
}

module.exports = Otc;
