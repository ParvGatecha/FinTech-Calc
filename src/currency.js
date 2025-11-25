/**
 * Converts an amount from one currency to another.
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - The source currency code (e.g., 'USD').
 * @param {string} toCurrency - The target currency code (e.g., 'EUR').
 * @param {Object} rates - An object containing exchange rates relative to a base currency (e.g., USD).
 * @returns {number} The converted amount.
 */
function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    if (amount < 0) throw new Error("Amount cannot be negative");
    if (!rates[fromCurrency] || !rates[toCurrency]) throw new Error("Invalid currency code");

    const amountInBase = amount / rates[fromCurrency];
    const convertedAmount = amountInBase * rates[toCurrency];
    
    return Number(convertedAmount.toFixed(2));
}

/**
 * Mock function to simulate getting historical rates.
 * @param {string} date - The date in YYYY-MM-DD format.
 * @param {string} baseCurrency - The base currency.
 * @returns {Promise<Object>} A promise resolving to the rates object.
 */
async function getHistoricalRate(date, baseCurrency) {
    // In a real app, this would fetch from an API.
    // Here we return a mock object.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                [baseCurrency]: 1,
                'USD': 1,
                'EUR': 0.85,
                'GBP': 0.75,
                'JPY': 110.0
            });
        }, 100);
    });
}

module.exports = {
    convertCurrency,
    getHistoricalRate
};
