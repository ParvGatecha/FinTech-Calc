/**
 * Calculates the monthly payment for a loan.
 * @param {number} principal - The loan amount.
 * @param {number} annualRate - The annual interest rate (in percent).
 * @param {number} termYears - The term of the loan in years.
 * @returns {number} The monthly payment amount.
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
function calculateMonthlyPayment(principal, annualRate, termYears) {
  if (stryMutAct_9fa48("87")) {
    {}
  } else {
    stryCov_9fa48("87");
    if (stryMutAct_9fa48("90") ? (principal <= 0 || annualRate < 0) && termYears <= 0 : stryMutAct_9fa48("89") ? false : stryMutAct_9fa48("88") ? true : (stryCov_9fa48("88", "89", "90"), (stryMutAct_9fa48("92") ? principal <= 0 && annualRate < 0 : stryMutAct_9fa48("91") ? false : (stryCov_9fa48("91", "92"), (stryMutAct_9fa48("95") ? principal > 0 : stryMutAct_9fa48("94") ? principal < 0 : stryMutAct_9fa48("93") ? false : (stryCov_9fa48("93", "94", "95"), principal <= 0)) || (stryMutAct_9fa48("98") ? annualRate >= 0 : stryMutAct_9fa48("97") ? annualRate <= 0 : stryMutAct_9fa48("96") ? false : (stryCov_9fa48("96", "97", "98"), annualRate < 0)))) || (stryMutAct_9fa48("101") ? termYears > 0 : stryMutAct_9fa48("100") ? termYears < 0 : stryMutAct_9fa48("99") ? false : (stryCov_9fa48("99", "100", "101"), termYears <= 0)))) {
      if (stryMutAct_9fa48("102")) {
        {}
      } else {
        stryCov_9fa48("102");
        throw new Error(stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), "Invalid input parameters"));
      }
    }
    if (stryMutAct_9fa48("106") ? annualRate !== 0 : stryMutAct_9fa48("105") ? false : stryMutAct_9fa48("104") ? true : (stryCov_9fa48("104", "105", "106"), annualRate === 0)) {
      if (stryMutAct_9fa48("107")) {
        {}
      } else {
        stryCov_9fa48("107");
        return stryMutAct_9fa48("108") ? principal * (termYears * 12) : (stryCov_9fa48("108"), principal / (stryMutAct_9fa48("109") ? termYears / 12 : (stryCov_9fa48("109"), termYears * 12)));
      }
    }
    const monthlyRate = stryMutAct_9fa48("110") ? annualRate / 100 * 12 : (stryCov_9fa48("110"), (stryMutAct_9fa48("111") ? annualRate * 100 : (stryCov_9fa48("111"), annualRate / 100)) / 12);
    const numberOfPayments = stryMutAct_9fa48("112") ? termYears / 12 : (stryCov_9fa48("112"), termYears * 12);
    const numerator = stryMutAct_9fa48("113") ? principal * monthlyRate / Math.pow(1 + monthlyRate, numberOfPayments) : (stryCov_9fa48("113"), (stryMutAct_9fa48("114") ? principal / monthlyRate : (stryCov_9fa48("114"), principal * monthlyRate)) * Math.pow(stryMutAct_9fa48("115") ? 1 - monthlyRate : (stryCov_9fa48("115"), 1 + monthlyRate), numberOfPayments));
    const denominator = stryMutAct_9fa48("116") ? Math.pow(1 + monthlyRate, numberOfPayments) + 1 : (stryCov_9fa48("116"), Math.pow(stryMutAct_9fa48("117") ? 1 - monthlyRate : (stryCov_9fa48("117"), 1 + monthlyRate), numberOfPayments) - 1);
    return stryMutAct_9fa48("118") ? numerator * denominator : (stryCov_9fa48("118"), numerator / denominator);
  }
}

/**
 * Generates an amortization schedule for a loan.
 * @param {number} principal - The loan amount.
 * @param {number} annualRate - The annual interest rate (in percent).
 * @param {number} termYears - The term of the loan in years.
 * @returns {Array<Object>} An array of objects representing the schedule.
 */
function calculateAmortizationSchedule(principal, annualRate, termYears) {
  if (stryMutAct_9fa48("119")) {
    {}
  } else {
    stryCov_9fa48("119");
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termYears);
    const monthlyRate = stryMutAct_9fa48("120") ? annualRate / 100 * 12 : (stryCov_9fa48("120"), (stryMutAct_9fa48("121") ? annualRate * 100 : (stryCov_9fa48("121"), annualRate / 100)) / 12);
    const numberOfPayments = stryMutAct_9fa48("122") ? termYears / 12 : (stryCov_9fa48("122"), termYears * 12);
    let balance = principal;
    const schedule = stryMutAct_9fa48("123") ? ["Stryker was here"] : (stryCov_9fa48("123"), []);
    for (let i = 1; stryMutAct_9fa48("126") ? i > numberOfPayments : stryMutAct_9fa48("125") ? i < numberOfPayments : stryMutAct_9fa48("124") ? false : (stryCov_9fa48("124", "125", "126"), i <= numberOfPayments); stryMutAct_9fa48("127") ? i-- : (stryCov_9fa48("127"), i++)) {
      if (stryMutAct_9fa48("128")) {
        {}
      } else {
        stryCov_9fa48("128");
        const interestPayment = stryMutAct_9fa48("129") ? balance / monthlyRate : (stryCov_9fa48("129"), balance * monthlyRate);
        let principalPayment = stryMutAct_9fa48("130") ? monthlyPayment + interestPayment : (stryCov_9fa48("130"), monthlyPayment - interestPayment);

        // Adjust for the last payment to bring balance exactly to 0
        if (stryMutAct_9fa48("134") ? balance - principalPayment >= 0.01 : stryMutAct_9fa48("133") ? balance - principalPayment <= 0.01 : stryMutAct_9fa48("132") ? false : stryMutAct_9fa48("131") ? true : (stryCov_9fa48("131", "132", "133", "134"), (stryMutAct_9fa48("135") ? balance + principalPayment : (stryCov_9fa48("135"), balance - principalPayment)) < 0.01)) {
          if (stryMutAct_9fa48("136")) {
            {}
          } else {
            stryCov_9fa48("136");
            principalPayment = balance;
          }
        }
        stryMutAct_9fa48("137") ? balance += principalPayment : (stryCov_9fa48("137"), balance -= principalPayment);

        // Handle floating point errors near zero
        if (stryMutAct_9fa48("141") ? balance >= 0 : stryMutAct_9fa48("140") ? balance <= 0 : stryMutAct_9fa48("139") ? false : stryMutAct_9fa48("138") ? true : (stryCov_9fa48("138", "139", "140", "141"), balance < 0)) balance = 0;
        schedule.push(stryMutAct_9fa48("142") ? {} : (stryCov_9fa48("142"), {
          paymentNumber: i,
          payment: Number(monthlyPayment.toFixed(2)),
          principalPayment: Number(principalPayment.toFixed(2)),
          interestPayment: Number(interestPayment.toFixed(2)),
          balance: Number(balance.toFixed(2))
        }));
        if (stryMutAct_9fa48("145") ? balance !== 0 : stryMutAct_9fa48("144") ? false : stryMutAct_9fa48("143") ? true : (stryCov_9fa48("143", "144", "145"), balance === 0)) break;
      }
    }
    return schedule;
  }
}
module.exports = stryMutAct_9fa48("146") ? {} : (stryCov_9fa48("146"), {
  calculateMonthlyPayment,
  calculateAmortizationSchedule
});