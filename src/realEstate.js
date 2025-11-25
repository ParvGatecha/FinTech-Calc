/**
 * Real Estate Analysis Module
 * Provides tools for analyzing real estate investments and mortgages.
 */

/**
 * Estimates the maximum affordable mortgage based on income and debts.
 * Uses standard front-end (28%) and back-end (36%) debt-to-income ratios.
 * @param {number} annualIncome - Gross annual income.
 * @param {number} monthlyDebts - Total monthly debt payments (excluding mortgage).
 * @param {number} interestRate - Annual interest rate (percent).
 * @param {number} termYears - Loan term in years.
 * @returns {Object} Max mortgage amount and monthly payment details.
 */
function calculateMortgageMax(annualIncome, monthlyDebts, interestRate, termYears) {
    if (annualIncome < 0 || monthlyDebts < 0 || interestRate < 0 || termYears <= 0) {
        throw new Error("Invalid input parameters");
    }

    const monthlyIncome = annualIncome / 12;
    
    // Front-end ratio: Housing costs should not exceed 28% of gross income
    const maxPaymentFrontEnd = monthlyIncome * 0.28;
    
    // Back-end ratio: Total debt (housing + other) should not exceed 36% of gross income
    const maxTotalDebtPayment = monthlyIncome * 0.36;
    const maxPaymentBackEnd = maxTotalDebtPayment - monthlyDebts;
    
    // The lower of the two is the limit
    const maxMonthlyPayment = Math.min(maxPaymentFrontEnd, maxPaymentBackEnd);
    
    if (maxMonthlyPayment <= 0) {
        return {
            maxMortgage: 0,
            maxMonthlyPayment: 0,
            limitingFactor: "Debt-to-Income Ratio"
        };
    }

    // Calculate max principal based on max payment
    // P = M * ((1+r)^n - 1) / (r * (1+r)^n)
    const r = interestRate / 100 / 12;
    const n = termYears * 12;
    
    let maxMortgage = 0;
    if (interestRate === 0) {
        maxMortgage = maxMonthlyPayment * n;
    } else {
        maxMortgage = maxMonthlyPayment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    }

    return {
        maxMortgage: Number(maxMortgage.toFixed(2)),
        maxMonthlyPayment: Number(maxMonthlyPayment.toFixed(2)),
        limitingFactor: maxPaymentFrontEnd < maxPaymentBackEnd ? "Front-End Ratio (28%)" : "Back-End Ratio (36%)"
    };
}

/**
 * Calculates Gross and Net Rental Yield.
 * @param {number} annualRent - Total annual rent income.
 * @param {number} propertyValue - Current market value or purchase price.
 * @param {number} annualExpenses - Total annual expenses (taxes, insurance, maintenance, etc.).
 * @returns {Object} Yield percentages.
 */
function calculateRentalYield(annualRent, propertyValue, annualExpenses) {
    if (annualRent < 0 || propertyValue <= 0 || annualExpenses < 0) {
        throw new Error("Invalid input parameters");
    }

    const grossYield = (annualRent / propertyValue) * 100;
    const netIncome = annualRent - annualExpenses;
    const netYield = (netIncome / propertyValue) * 100;

    return {
        grossYield: Number(grossYield.toFixed(2)),
        netYield: Number(netYield.toFixed(2)),
        netAnnualIncome: Number(netIncome.toFixed(2))
    };
}

/**
 * Calculates the Capitalization Rate (Cap Rate).
 * @param {number} netOperatingIncome - Annual NOI (Income - Operating Expenses).
 * @param {number} propertyValue - Current market value.
 * @returns {number} Cap Rate percentage.
 */
function calculateCapRate(netOperatingIncome, propertyValue) {
    if (propertyValue <= 0) throw new Error("Property value must be positive");
    
    return Number(((netOperatingIncome / propertyValue) * 100).toFixed(2));
}

/**
 * Calculates Cash-on-Cash Return.
 * @param {number} annualCashFlow - Annual pre-tax cash flow.
 * @param {number} totalCashInvested - Total cash invested (down payment + closing costs + rehab).
 * @returns {number} Cash-on-Cash Return percentage.
 */
function calculateCashOnCashReturn(annualCashFlow, totalCashInvested) {
    if (totalCashInvested === 0) throw new Error("Total cash invested cannot be zero");
    
    return Number(((annualCashFlow / totalCashInvested) * 100).toFixed(2));
}

/**
 * Projects property value appreciation.
 * @param {number} currentValue - Current property value.
 * @param {number} annualRate - Annual appreciation rate (percent).
 * @param {number} years - Number of years to project.
 * @returns {Object} Future value and total appreciation.
 */
function calculateAppreciation(currentValue, annualRate, years) {
    if (currentValue < 0 || years < 0) throw new Error("Invalid input parameters");

    const r = annualRate / 100;
    const futureValue = currentValue * Math.pow(1 + r, years);
    const totalAppreciation = futureValue - currentValue;

    return {
        futureValue: Number(futureValue.toFixed(2)),
        totalAppreciation: Number(totalAppreciation.toFixed(2))
    };
}

/**
 * Estimates closing costs based on property value and location factor.
 * @param {number} propertyValue - Purchase price.
 * @param {number} locationFactor - Multiplier for high/low cost areas (default 1.0, range 0.5-2.0).
 * @returns {Object} Estimated closing costs breakdown.
 */
function calculateClosingCosts(propertyValue, locationFactor = 1.0) {
    if (propertyValue < 0 || locationFactor <= 0) throw new Error("Invalid input parameters");

    // Typical closing costs range from 2% to 5% of purchase price
    // We'll use a detailed breakdown estimation
    
    const baseRate = 0.03 * locationFactor; // Average 3% adjusted by location
    
    const estimatedTotal = propertyValue * baseRate;
    
    // Rough breakdown
    const loanOrigination = estimatedTotal * 0.25;
    const appraisal = 500 * locationFactor;
    const titleInsurance = estimatedTotal * 0.30;
    const recordingFees = 150 * locationFactor;
    const prepaidTaxes = estimatedTotal * 0.20;
    const misc = estimatedTotal - (loanOrigination + appraisal + titleInsurance + recordingFees + prepaidTaxes);

    return {
        estimatedTotal: Number(estimatedTotal.toFixed(2)),
        breakdown: {
            loanOrigination: Number(loanOrigination.toFixed(2)),
            appraisal: Number(appraisal.toFixed(2)),
            titleInsurance: Number(titleInsurance.toFixed(2)),
            recordingFees: Number(recordingFees.toFixed(2)),
            prepaidTaxes: Number(prepaidTaxes.toFixed(2)),
            misc: Number(misc.toFixed(2))
        }
    };
}

module.exports = {
    calculateMortgageMax,
    calculateRentalYield,
    calculateCapRate,
    calculateCashOnCashReturn,
    calculateAppreciation,
    calculateClosingCosts
};
