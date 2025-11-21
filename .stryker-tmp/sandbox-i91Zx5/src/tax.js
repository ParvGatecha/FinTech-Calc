/**
 * Calculates income tax based on progressive tax brackets.
 * @param {number} income - The total annual income.
 * @param {Array<Object>} brackets - Array of tax brackets sorted by min income.
 * @returns {number} The total tax amount.
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
function calculateIncomeTax(income, brackets) {
  if (stryMutAct_9fa48("147")) {
    {}
  } else {
    stryCov_9fa48("147");
    if (stryMutAct_9fa48("151") ? income >= 0 : stryMutAct_9fa48("150") ? income <= 0 : stryMutAct_9fa48("149") ? false : stryMutAct_9fa48("148") ? true : (stryCov_9fa48("148", "149", "150", "151"), income < 0)) {
      if (stryMutAct_9fa48("152")) {
        {}
      } else {
        stryCov_9fa48("152");
        throw new Error(stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), "Income cannot be negative"));
      }
    }
    if (stryMutAct_9fa48("156") ? !brackets && brackets.length === 0 : stryMutAct_9fa48("155") ? false : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155", "156"), (stryMutAct_9fa48("157") ? brackets : (stryCov_9fa48("157"), !brackets)) || (stryMutAct_9fa48("159") ? brackets.length !== 0 : stryMutAct_9fa48("158") ? false : (stryCov_9fa48("158", "159"), brackets.length === 0)))) {
      if (stryMutAct_9fa48("160")) {
        {}
      } else {
        stryCov_9fa48("160");
        throw new Error(stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), "Invalid tax brackets"));
      }
    }
    let tax = 0;
    let remainingIncome = income;
    let previousMax = 0;
    for (const bracket of brackets) {
      if (stryMutAct_9fa48("162")) {
        {}
      } else {
        stryCov_9fa48("162");
        const range = stryMutAct_9fa48("163") ? bracket.max + previousMax : (stryCov_9fa48("163"), bracket.max - previousMax);
        const taxableAmount = stryMutAct_9fa48("164") ? Math.max(remainingIncome, range) : (stryCov_9fa48("164"), Math.min(remainingIncome, range));
        if (stryMutAct_9fa48("168") ? taxableAmount <= 0 : stryMutAct_9fa48("167") ? taxableAmount >= 0 : stryMutAct_9fa48("166") ? false : stryMutAct_9fa48("165") ? true : (stryCov_9fa48("165", "166", "167", "168"), taxableAmount > 0)) {
          if (stryMutAct_9fa48("169")) {
            {}
          } else {
            stryCov_9fa48("169");
            stryMutAct_9fa48("170") ? tax -= taxableAmount * bracket.rate : (stryCov_9fa48("170"), tax += stryMutAct_9fa48("171") ? taxableAmount / bracket.rate : (stryCov_9fa48("171"), taxableAmount * bracket.rate));
            stryMutAct_9fa48("172") ? remainingIncome += taxableAmount : (stryCov_9fa48("172"), remainingIncome -= taxableAmount);
          }
        }
        previousMax = bracket.max;
        if (stryMutAct_9fa48("176") ? remainingIncome > 0 : stryMutAct_9fa48("175") ? remainingIncome < 0 : stryMutAct_9fa48("174") ? false : stryMutAct_9fa48("173") ? true : (stryCov_9fa48("173", "174", "175", "176"), remainingIncome <= 0)) break;
      }
    }

    // If there is still income left above the last bracket (assuming last bracket max is Infinity or effectively so, 
    // but if the loop finishes and there's remaining income, it means the brackets didn't cover it. 
    // However, usually the last bracket has max: Infinity. 
    // If the last bracket has a finite max, and there is remaining income, we should probably handle it or assume it's taxed at the last rate?
    // For this implementation, let's assume the last provided bracket covers everything above its min if max is not provided or Infinity.
    // But if the loop exits, it means we've exhausted the brackets. 
    // Let's stick to the logic: brackets should cover the range.

    return Number(tax.toFixed(2));
  }
}

/**
 * Calculates the effective tax rate.
 * @param {number} income - The total annual income.
 * @param {number} tax - The total tax paid.
 * @returns {number} The effective tax rate as a percentage.
 */
function calculateEffectiveTaxRate(income, tax) {
  if (stryMutAct_9fa48("177")) {
    {}
  } else {
    stryCov_9fa48("177");
    if (stryMutAct_9fa48("180") ? income !== 0 : stryMutAct_9fa48("179") ? false : stryMutAct_9fa48("178") ? true : (stryCov_9fa48("178", "179", "180"), income === 0)) return 0;
    return Number((stryMutAct_9fa48("181") ? tax / income / 100 : (stryCov_9fa48("181"), (stryMutAct_9fa48("182") ? tax * income : (stryCov_9fa48("182"), tax / income)) * 100)).toFixed(2));
  }
}
module.exports = stryMutAct_9fa48("183") ? {} : (stryCov_9fa48("183"), {
  calculateIncomeTax,
  calculateEffectiveTaxRate
});