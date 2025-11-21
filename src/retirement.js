/**
 * Retirement Planning Module
 * Provides functions for retirement savings projection and analysis.
 */

/**
 * Projects 401(k) balance over time.
 * @param {number} currentBalance - Current 401(k) balance.
 * @param {number} annualContribution - Annual contribution amount (employee).
 * @param {number} employerMatch - Employer match percentage of salary (e.g., 3 for 3%).
 * @param {number} annualReturn - Expected annual return (percentage).
 * @param {number} years - Number of years to project.
 * @param {number} salary - Current annual salary.
 * @param {number} salaryGrowth - Expected annual salary growth (percentage).
 * @returns {Object} Projection result containing final balance and year-by-year breakdown.
 */
function calculate401kProjection(currentBalance, annualContribution, employerMatch, annualReturn, years, salary, salaryGrowth) {
    if (currentBalance < 0 || annualContribution < 0 || years < 0 || salary < 0) {
        throw new Error("Invalid input parameters");
    }

    const r = annualReturn / 100;
    const g = salaryGrowth / 100;
    const matchRate = employerMatch / 100;

    let balance = currentBalance;
    let currentSalary = salary;
    const breakdown = [];

    for (let i = 1; i <= years; i++) {
        const matchAmount = currentSalary * matchRate;
        const totalContribution = annualContribution + matchAmount;
        
        // Interest is applied to the balance at start of year + contributions made during year
        // Simplified: Contributions made at end of year? Or spread? 
        // Let's assume contributions are made monthly, but for simplicity here we'll apply return to start balance
        // and half return to contributions (mid-year convention).
        
        const investmentGrowth = balance * r + totalContribution * (r / 2);
        
        balance += totalContribution + investmentGrowth;
        
        breakdown.push({
            year: i,
            salary: Number(currentSalary.toFixed(2)),
            contribution: Number(totalContribution.toFixed(2)),
            balance: Number(balance.toFixed(2))
        });

        currentSalary *= (1 + g);
    }

    return {
        finalBalance: Number(balance.toFixed(2)),
        breakdown
    };
}

/**
 * Calculates Required Minimum Distribution (RMD).
 * Uses a simplified Uniform Lifetime Table.
 * @param {number} age - Current age.
 * @param {number} accountBalance - Account balance at end of prior year.
 * @returns {number} The RMD amount.
 */
function calculateRMD(age, accountBalance) {
    if (age < 72) return 0; // RMDs start at 72 (simplified rule)
    if (accountBalance < 0) throw new Error("Invalid account balance");

    // Simplified IRS Uniform Lifetime Table (partial)
    // Age -> Distribution Period
    const distributionPeriods = {
        72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7,
        77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2, 81: 19.4,
        82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2,
        87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5,
        92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9, 96: 8.4,
        97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4
    };

    let period = distributionPeriods[age];
    if (!period) {
        if (age > 100) period = 6.0; // Cap for > 100
        else period = 27.4; // Fallback? Or throw?
    }

    const rmd = accountBalance / period;
    return Number(rmd.toFixed(2));
}

/**
 * Assesses retirement readiness using a Monte Carlo-lite simulation.
 * @param {number} currentSavings - Current savings.
 * @param {number} annualSavings - Annual savings until retirement.
 * @param {number} annualExpenses - Desired annual retirement expenses.
 * @param {number} yearsToRetirement - Years until retirement.
 * @param {number} yearsInRetirement - Years expected in retirement.
 * @param {number} expectedReturn - Mean expected annual return (percentage).
 * @param {number} stdDev - Standard deviation of returns (percentage).
 * @returns {Object} Analysis result including success probability.
 */
function assessRetirementReadiness(currentSavings, annualSavings, annualExpenses, yearsToRetirement, yearsInRetirement, expectedReturn, stdDev) {
    if (currentSavings < 0 || annualSavings < 0 || annualExpenses < 0 || yearsToRetirement < 0 || yearsInRetirement < 0) {
        throw new Error("Invalid input parameters");
    }

    const simulations = 1000;
    let successCount = 0;

    for (let i = 0; i < simulations; i++) {
        let balance = currentSavings;

        // Accumulation Phase
        for (let y = 0; y < yearsToRetirement; y++) {
            const returnRate = generateRandomNormal(expectedReturn, stdDev) / 100;
            balance = balance * (1 + returnRate) + annualSavings;
        }

        // Decumulation Phase
        let failed = false;
        for (let y = 0; y < yearsInRetirement; y++) {
            const returnRate = generateRandomNormal(expectedReturn, stdDev) / 100;
            balance = balance * (1 + returnRate) - annualExpenses;
            
            // Adjust expenses for inflation? Let's keep it simple for now or assume real returns.
            // Assuming inputs are real returns (inflation-adjusted).

            if (balance < 0) {
                failed = true;
                break;
            }
        }

        if (!failed) successCount++;
    }

    const probability = (successCount / simulations) * 100;
    
    return {
        successProbability: Number(probability.toFixed(2)),
        recommendation: probability > 85 ? "On Track" : (probability > 50 ? "At Risk" : "Critical Action Needed")
    };
}

/**
 * Helper to generate random number from normal distribution (Box-Muller transform).
 */
function generateRandomNormal(mean, stdDev) {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
}

module.exports = {
    calculate401kProjection,
    calculateRMD,
    assessRetirementReadiness
};
