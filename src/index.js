const BigNumber = require('bignumber.js');

const ExchangeRate = require('./service/exchangeRate');
const Otc = require('./service/otc');

async function main() {
    // fetch USDT/CNY
    const otc = new Otc();
    const { data } = await otc.getSellPrice();
    if (!Array.isArray(data) || !data.length) {
        throw new Error('fetch USTD/CNY fail');
    }
    const usdtCNYPrice = data[0].price;

    // fetch USD/CNY
    const exchangeRate = new ExchangeRate();
    const { rates } = await exchangeRate.getRate();
    const usdCNYPrice = rates.CNY;

    // calculate Premium Rate
    const premiumRate = new BigNumber(usdtCNYPrice)
        .minus(usdCNYPrice)
        .dividedBy(usdCNYPrice)
        .multipliedBy(100);

    const res = {
        'USDT/CNY': usdtCNYPrice,
        'USD/CNY': usdCNYPrice,
        'Rate': premiumRate.toFormat(2) + '%',
    };

    console.log(JSON.stringify(res, null, 2));
}

main();
