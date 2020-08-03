const ExchangeRate = require('./service/exchangeRate');

async function main() {
    const exchangeRate = new ExchangeRate();
    const { rates } = exchangeRate.getRate();

    

}

main();
