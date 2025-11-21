/**
 * Converts an amount from one currency to another.
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - The source currency code (e.g., 'USD').
 * @param {string} toCurrency - The target currency code (e.g., 'EUR').
 * @param {Object} rates - An object containing exchange rates relative to a base currency (e.g., USD).
 * @returns {number} The converted amount.
 */
// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    if (stryMutAct_9fa48("4") ? amount >= 0 : stryMutAct_9fa48("3") ? amount <= 0 : stryMutAct_9fa48("2") ? false : stryMutAct_9fa48("1") ? true : (stryCov_9fa48("1", "2", "3", "4"), amount < 0)) throw new Error(stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), "Amount cannot be negative"));
    if (stryMutAct_9fa48("8") ? !rates[fromCurrency] && !rates[toCurrency] : stryMutAct_9fa48("7") ? false : stryMutAct_9fa48("6") ? true : (stryCov_9fa48("6", "7", "8"), (stryMutAct_9fa48("9") ? rates[fromCurrency] : (stryCov_9fa48("9"), !rates[fromCurrency])) || (stryMutAct_9fa48("10") ? rates[toCurrency] : (stryCov_9fa48("10"), !rates[toCurrency])))) throw new Error(stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "Invalid currency code"));

    // Convert to base currency first (assuming rates are relative to a base, e.g. USD = 1)
    // If rates are direct (e.g. USD to EUR), logic would be different. 
    // Let's assume rates are "per USD" or similar base.
    // amountInBase = amount / rate(from)
    // amountInTarget = amountInBase * rate(to)

    // Example: 100 EUR to GBP. Base USD.
    // EUR = 0.85 (1 USD = 0.85 EUR) -> 1 EUR = 1.17 USD
    // GBP = 0.75 (1 USD = 0.75 GBP)
    // 100 EUR / 0.85 = 117.64 USD
    // 117.64 USD * 0.75 = 88.23 GBP

    const amountInBase = stryMutAct_9fa48("12") ? amount * rates[fromCurrency] : (stryCov_9fa48("12"), amount / rates[fromCurrency]);
    const convertedAmount = stryMutAct_9fa48("13") ? amountInBase / rates[toCurrency] : (stryCov_9fa48("13"), amountInBase * rates[toCurrency]);
    return Number(convertedAmount.toFixed(2));
  }
}

/**
 * Mock function to simulate getting historical rates.
 * @param {string} date - The date in YYYY-MM-DD format.
 * @param {string} baseCurrency - The base currency.
 * @returns {Promise<Object>} A promise resolving to the rates object.
 */
async function getHistoricalRate(date, baseCurrency) {
  if (stryMutAct_9fa48("14")) {
    {}
  } else {
    stryCov_9fa48("14");
    // In a real app, this would fetch from an API.
    // Here we return a mock object.
    return new Promise(resolve => {
      if (stryMutAct_9fa48("15")) {
        {}
      } else {
        stryCov_9fa48("15");
        setTimeout(() => {
          if (stryMutAct_9fa48("16")) {
            {}
          } else {
            stryCov_9fa48("16");
            resolve(stryMutAct_9fa48("17") ? {} : (stryCov_9fa48("17"), {
              [baseCurrency]: 1,
              'USD': 1,
              'EUR': 0.85,
              'GBP': 0.75,
              'JPY': 110.0
            }));
          }
        }, 100);
      }
    });
  }
}
module.exports = stryMutAct_9fa48("18") ? {} : (stryCov_9fa48("18"), {
  convertCurrency,
  getHistoricalRate
});