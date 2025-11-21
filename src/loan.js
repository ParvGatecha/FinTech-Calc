/**
 * Calculates the monthly payment for a loan.
 * @param {number} principal - The loan amount.
 * @param {number} annualRate - The annual interest rate (in percent).
 * @param {number} termYears - The term of the loan in years.
 * @returns {number} The monthly payment amount.
 */
function calculateMonthlyPayment(principal, annualRate, termYears) {
  if (principal <= 0 || annualRate < 0 || termYears <= 0) {
    throw new Error("Invalid input parameters");
  }

  if (annualRate === 0) {
    return principal / (termYears * 12);
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;

  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
  const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;

  return numerator / denominator;
}

/**
 * Generates an amortization schedule for a loan.
 * @param {number} principal - The loan amount.
 * @param {number} annualRate - The annual interest rate (in percent).
 * @param {number} termYears - The term of the loan in years.
 * @returns {Array<Object>} An array of objects representing the schedule.
 */
function calculateAmortizationSchedule(principal, annualRate, termYears) {
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termYears);
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = termYears * 12;
    
    let balance = principal;
    const schedule = [];

    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;
        
        // Adjust for the last payment to bring balance exactly to 0
        if (balance - principalPayment < 0.01) {
             principalPayment = balance;
        }

        balance -= principalPayment;
        
        // Handle floating point errors near zero
        if (balance < 0) balance = 0;

        schedule.push({
            paymentNumber: i,
            payment: Number(monthlyPayment.toFixed(2)),
            principalPayment: Number(principalPayment.toFixed(2)),
            interestPayment: Number(interestPayment.toFixed(2)),
            balance: Number(balance.toFixed(2))
        });
        
        if (balance === 0) break;
    }

    return schedule;
}

/**
 * Calculates the financial impact of refinancing a loan.
 * @param {number} currentPrincipal - Remaining principal on current loan.
 * @param {number} currentRate - Current annual interest rate (percent).
 * @param {number} currentRemainingTerm - Remaining months on current loan.
 * @param {number} newRate - New annual interest rate (percent).
 * @param {number} newTermYears - Term of the new loan in years.
 * @param {number} closingCosts - Total closing costs for the new loan.
 * @returns {Object} Analysis of savings and break-even point.
 */
function calculateRefinanceImpact(currentPrincipal, currentRate, currentRemainingTerm, newRate, newTermYears, closingCosts) {
    if (currentPrincipal <= 0 || currentRate < 0 || currentRemainingTerm <= 0 || newRate < 0 || newTermYears <= 0 || closingCosts < 0) {
        throw new Error("Invalid input parameters");
    }

    // Current Loan Details
    const currentMonthlyRate = currentRate / 100 / 12;
    // Calculate current monthly payment based on remaining term (assuming fully amortizing)
    // Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const currentPayment = currentPrincipal * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentRemainingTerm) / (Math.pow(1 + currentMonthlyRate, currentRemainingTerm) - 1);
    const totalCurrentCost = currentPayment * currentRemainingTerm;

    // New Loan Details
    const newMonthlyPayment = calculateMonthlyPayment(currentPrincipal, newRate, newTermYears);
    const newTotalTermMonths = newTermYears * 12;
    const totalNewCost = (newMonthlyPayment * newTotalTermMonths) + closingCosts;

    const monthlySavings = currentPayment - newMonthlyPayment;
    const totalSavings = totalCurrentCost - totalNewCost;
    
    let breakEvenMonths = 0;
    if (monthlySavings > 0) {
        breakEvenMonths = Math.ceil(closingCosts / monthlySavings);
    } else {
        breakEvenMonths = Infinity; // Never break even if new payment is higher
    }

    return {
        currentMonthlyPayment: Number(currentPayment.toFixed(2)),
        newMonthlyPayment: Number(newMonthlyPayment.toFixed(2)),
        monthlySavings: Number(monthlySavings.toFixed(2)),
        totalSavings: Number(totalSavings.toFixed(2)),
        breakEvenMonths: breakEvenMonths
    };
}

/**
 * Generates an amortization schedule with extra monthly payments.
 * @param {number} principal - Loan amount.
 * @param {number} annualRate - Annual interest rate.
 * @param {number} termYears - Loan term.
 * @param {number} extraPayment - Extra amount paid each month.
 * @returns {Object} Schedule and savings summary.
 */
function calculateExtraPaymentSchedule(principal, annualRate, termYears, extraPayment) {
    if (principal <= 0 || annualRate < 0 || termYears <= 0 || extraPayment < 0) {
        throw new Error("Invalid input parameters");
    }

    const regularPayment = calculateMonthlyPayment(principal, annualRate, termYears);
    const totalPayment = regularPayment + extraPayment;
    const monthlyRate = annualRate / 100 / 12;
    
    let balance = principal;
    let totalInterest = 0;
    let months = 0;
    const schedule = [];

    while (balance > 0) {
        months++;
        const interestPayment = balance * monthlyRate;
        let principalPayment = totalPayment - interestPayment;
        
        if (balance - principalPayment < 0.01) {
            principalPayment = balance;
        }

        balance -= principalPayment;
        totalInterest += interestPayment;
        
        if (balance < 0) balance = 0;

        schedule.push({
            paymentNumber: months,
            payment: Number((interestPayment + principalPayment).toFixed(2)),
            principalPayment: Number(principalPayment.toFixed(2)),
            interestPayment: Number(interestPayment.toFixed(2)),
            balance: Number(balance.toFixed(2))
        });

        if (months > termYears * 12 * 2) break; // Safety break
    }

    // Calculate original interest
    const originalSchedule = calculateAmortizationSchedule(principal, annualRate, termYears);
    const originalInterest = originalSchedule.reduce((sum, p) => sum + p.interestPayment, 0);

    return {
        schedule,
        newTermMonths: months,
        interestSaved: Number((originalInterest - totalInterest).toFixed(2))
    };
}

/**
 * Calculates monthly payment for a loan with a balloon payment at the end.
 * @param {number} principal - Loan amount.
 * @param {number} annualRate - Annual interest rate.
 * @param {number} termYears - Loan term.
 * @param {number} balloonAmount - Amount due at the end.
 * @returns {number} Monthly payment.
 */
function calculateBalloonPayment(principal, annualRate, termYears, balloonAmount) {
     if (principal <= 0 || annualRate < 0 || termYears <= 0 || balloonAmount < 0) {
        throw new Error("Invalid input parameters");
    }
    
    // PV of Balloon = Balloon / (1+r)^n
    // PV of Payments = Principal - PV of Balloon
    // Payment = (Principal - PV of Balloon) * (r * (1+r)^n) / ((1+r)^n - 1)
    
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = termYears * 12;
    
    const pvBalloon = balloonAmount / Math.pow(1 + monthlyRate, numberOfPayments);
    const amortizedPrincipal = principal - pvBalloon;
    
    if (amortizedPrincipal <= 0) return 0; // Balloon covers everything? Unlikely but possible.

    const numerator = amortizedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;

    return Number((numerator / denominator).toFixed(2));
}

module.exports = {
  calculateMonthlyPayment,
  calculateAmortizationSchedule,
  calculateRefinanceImpact,
  calculateExtraPaymentSchedule,
  calculateBalloonPayment
};
