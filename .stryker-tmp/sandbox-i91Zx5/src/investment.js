/**
 * Calculates compound interest.
 * @param {number} principal - The initial investment.
 * @param {number} annualRate - The annual interest rate (in percent).
 * @param {number} timeYears - The time in years.
 * @param {number} frequency - The number of times interest is compounded per year.
 * @returns {number} The future value of the investment.
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
function calculateCompoundInterest(principal, annualRate, timeYears, frequency) {
  if (stryMutAct_9fa48("19")) {
    {}
  } else {
    stryCov_9fa48("19");
    if (stryMutAct_9fa48("22") ? (principal < 0 || annualRate < 0 || timeYears < 0) && frequency <= 0 : stryMutAct_9fa48("21") ? false : stryMutAct_9fa48("20") ? true : (stryCov_9fa48("20", "21", "22"), (stryMutAct_9fa48("24") ? (principal < 0 || annualRate < 0) && timeYears < 0 : stryMutAct_9fa48("23") ? false : (stryCov_9fa48("23", "24"), (stryMutAct_9fa48("26") ? principal < 0 && annualRate < 0 : stryMutAct_9fa48("25") ? false : (stryCov_9fa48("25", "26"), (stryMutAct_9fa48("29") ? principal >= 0 : stryMutAct_9fa48("28") ? principal <= 0 : stryMutAct_9fa48("27") ? false : (stryCov_9fa48("27", "28", "29"), principal < 0)) || (stryMutAct_9fa48("32") ? annualRate >= 0 : stryMutAct_9fa48("31") ? annualRate <= 0 : stryMutAct_9fa48("30") ? false : (stryCov_9fa48("30", "31", "32"), annualRate < 0)))) || (stryMutAct_9fa48("35") ? timeYears >= 0 : stryMutAct_9fa48("34") ? timeYears <= 0 : stryMutAct_9fa48("33") ? false : (stryCov_9fa48("33", "34", "35"), timeYears < 0)))) || (stryMutAct_9fa48("38") ? frequency > 0 : stryMutAct_9fa48("37") ? frequency < 0 : stryMutAct_9fa48("36") ? false : (stryCov_9fa48("36", "37", "38"), frequency <= 0)))) {
      if (stryMutAct_9fa48("39")) {
        {}
      } else {
        stryCov_9fa48("39");
        throw new Error(stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "Invalid input parameters"));
      }
    }
    const r = stryMutAct_9fa48("41") ? annualRate * 100 : (stryCov_9fa48("41"), annualRate / 100);
    const n = frequency;
    const t = timeYears;
    const amount = stryMutAct_9fa48("42") ? principal / Math.pow(1 + r / n, n * t) : (stryCov_9fa48("42"), principal * Math.pow(stryMutAct_9fa48("43") ? 1 - r / n : (stryCov_9fa48("43"), 1 + (stryMutAct_9fa48("44") ? r * n : (stryCov_9fa48("44"), r / n))), stryMutAct_9fa48("45") ? n / t : (stryCov_9fa48("45"), n * t)));
    return Number(amount.toFixed(2));
  }
}

/**
 * Forecasts portfolio growth with monthly contributions.
 * @param {number} initialInvestment - The starting amount.
 * @param {number} monthlyContribution - Amount added each month.
 * @param {number} annualRate - Annual return rate (in percent).
 * @param {number} years - Number of years to forecast.
 * @returns {number} The total portfolio value.
 */
function forecastPortfolioGrowth(initialInvestment, monthlyContribution, annualRate, years) {
  if (stryMutAct_9fa48("46")) {
    {}
  } else {
    stryCov_9fa48("46");
    if (stryMutAct_9fa48("49") ? (initialInvestment < 0 || monthlyContribution < 0 || annualRate < 0) && years < 0 : stryMutAct_9fa48("48") ? false : stryMutAct_9fa48("47") ? true : (stryCov_9fa48("47", "48", "49"), (stryMutAct_9fa48("51") ? (initialInvestment < 0 || monthlyContribution < 0) && annualRate < 0 : stryMutAct_9fa48("50") ? false : (stryCov_9fa48("50", "51"), (stryMutAct_9fa48("53") ? initialInvestment < 0 && monthlyContribution < 0 : stryMutAct_9fa48("52") ? false : (stryCov_9fa48("52", "53"), (stryMutAct_9fa48("56") ? initialInvestment >= 0 : stryMutAct_9fa48("55") ? initialInvestment <= 0 : stryMutAct_9fa48("54") ? false : (stryCov_9fa48("54", "55", "56"), initialInvestment < 0)) || (stryMutAct_9fa48("59") ? monthlyContribution >= 0 : stryMutAct_9fa48("58") ? monthlyContribution <= 0 : stryMutAct_9fa48("57") ? false : (stryCov_9fa48("57", "58", "59"), monthlyContribution < 0)))) || (stryMutAct_9fa48("62") ? annualRate >= 0 : stryMutAct_9fa48("61") ? annualRate <= 0 : stryMutAct_9fa48("60") ? false : (stryCov_9fa48("60", "61", "62"), annualRate < 0)))) || (stryMutAct_9fa48("65") ? years >= 0 : stryMutAct_9fa48("64") ? years <= 0 : stryMutAct_9fa48("63") ? false : (stryCov_9fa48("63", "64", "65"), years < 0)))) {
      if (stryMutAct_9fa48("66")) {
        {}
      } else {
        stryCov_9fa48("66");
        throw new Error(stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "Invalid input parameters"));
      }
    }
    const monthlyRate = stryMutAct_9fa48("68") ? annualRate / 100 * 12 : (stryCov_9fa48("68"), (stryMutAct_9fa48("69") ? annualRate * 100 : (stryCov_9fa48("69"), annualRate / 100)) / 12);
    const months = stryMutAct_9fa48("70") ? years / 12 : (stryCov_9fa48("70"), years * 12);
    let futureValue = stryMutAct_9fa48("71") ? initialInvestment / Math.pow(1 + monthlyRate, months) : (stryCov_9fa48("71"), initialInvestment * Math.pow(stryMutAct_9fa48("72") ? 1 - monthlyRate : (stryCov_9fa48("72"), 1 + monthlyRate), months));

    // Future value of a series (monthly contributions)
    // FV = P * ((1 + r)^n - 1) / r
    if (stryMutAct_9fa48("76") ? monthlyRate <= 0 : stryMutAct_9fa48("75") ? monthlyRate >= 0 : stryMutAct_9fa48("74") ? false : stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73", "74", "75", "76"), monthlyRate > 0)) {
      if (stryMutAct_9fa48("77")) {
        {}
      } else {
        stryCov_9fa48("77");
        stryMutAct_9fa48("78") ? futureValue -= monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate : (stryCov_9fa48("78"), futureValue += stryMutAct_9fa48("79") ? monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) * monthlyRate : (stryCov_9fa48("79"), (stryMutAct_9fa48("80") ? monthlyContribution / (Math.pow(1 + monthlyRate, months) - 1) : (stryCov_9fa48("80"), monthlyContribution * (stryMutAct_9fa48("81") ? Math.pow(1 + monthlyRate, months) + 1 : (stryCov_9fa48("81"), Math.pow(stryMutAct_9fa48("82") ? 1 - monthlyRate : (stryCov_9fa48("82"), 1 + monthlyRate), months) - 1)))) / monthlyRate));
      }
    } else {
      if (stryMutAct_9fa48("83")) {
        {}
      } else {
        stryCov_9fa48("83");
        stryMutAct_9fa48("84") ? futureValue -= monthlyContribution * months : (stryCov_9fa48("84"), futureValue += stryMutAct_9fa48("85") ? monthlyContribution / months : (stryCov_9fa48("85"), monthlyContribution * months));
      }
    }
    return Number(futureValue.toFixed(2));
  }
}
module.exports = stryMutAct_9fa48("86") ? {} : (stryCov_9fa48("86"), {
  calculateCompoundInterest,
  forecastPortfolioGrowth
});