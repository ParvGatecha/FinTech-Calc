/**
 * Calculates compound interest.
 * @param {number} principal - The initial investment.
 * @param {number} annualRate - The annual interest rate (in percent).
 * @param {number} timeYears - The time in years.
 * @param {number} frequency - The number of times interest is compounded per year.
 * @returns {number} The future value of the investment.
 */
function calculateCompoundInterest(principal, annualRate, timeYears, frequency) {
    if (principal < 0 || annualRate < 0 || timeYears < 0 || frequency <= 0) {
        throw new Error("Invalid input parameters");
    }

    const r = annualRate / 100;
    const n = frequency;
    const t = timeYears;

    const amount = principal * Math.pow(1 + r / n, n * t);
    return Number(amount.toFixed(2));
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
     if (initialInvestment < 0 || monthlyContribution < 0 || annualRate < 0 || years < 0) {
        throw new Error("Invalid input parameters");
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;
    
    let futureValue = initialInvestment * Math.pow(1 + monthlyRate, months);
    
    // Future value of a series (monthly contributions)
    // FV = P * ((1 + r)^n - 1) / r
    if (monthlyRate > 0) {
        futureValue += monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    } else {
        futureValue += monthlyContribution * months;
    }

    return Number(futureValue.toFixed(2));
}

/**
 * Runs a Monte Carlo simulation for portfolio growth.
 * @param {number} initialInvestment - Starting amount.
 * @param {number} monthlyContribution - Monthly addition.
 * @param {number} years - Investment horizon.
 * @param {number} meanReturn - Expected annual return (percent).
 * @param {number} stdDev - Annual volatility (percent).
 * @param {number} simulations - Number of runs (default 1000).
 * @returns {Object} Simulation results (min, max, median, percentiles).
 */
function runMonteCarloSimulation(initialInvestment, monthlyContribution, years, meanReturn, stdDev, simulations = 1000) {
    if (initialInvestment < 0 || monthlyContribution < 0 || years < 0 || simulations <= 0) {
        throw new Error("Invalid input parameters");
    }

    const results = [];
    const monthlyMean = meanReturn / 100 / 12;
    const monthlyStdDev = (stdDev / 100) / Math.sqrt(12);
    const months = years * 12;

    for (let i = 0; i < simulations; i++) {
        let balance = initialInvestment;
        for (let m = 0; m < months; m++) {
            // Box-Muller transform for random normal distribution
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            
            const monthlyReturn = monthlyMean + z * monthlyStdDev;
            balance = balance * (1 + monthlyReturn) + monthlyContribution;
        }
        results.push(balance);
    }

    results.sort((a, b) => a - b);

    const min = results[0];
    const max = results[results.length - 1];
    const median = results[Math.floor(results.length / 2)];
    const p10 = results[Math.floor(results.length * 0.1)];
    const p90 = results[Math.floor(results.length * 0.9)];

    return {
        min: Number(min.toFixed(2)),
        max: Number(max.toFixed(2)),
        median: Number(median.toFixed(2)),
        p10: Number(p10.toFixed(2)),
        p90: Number(p90.toFixed(2))
    };
}

/**
 * Calculates required adjustments to rebalance a portfolio.
 * @param {number} totalValue - Total portfolio value.
 * @param {Array<Object>} currentHoldings - Array of { name, value }.
 * @param {Array<Object>} targetAllocation - Array of { name, percent }.
 * @returns {Array<Object>} Rebalancing actions.
 */
function calculateAssetAllocation(totalValue, currentHoldings, targetAllocation) {
    if (totalValue < 0 || !Array.isArray(currentHoldings) || !Array.isArray(targetAllocation)) {
        throw new Error("Invalid input parameters");
    }

    const actions = [];
    
    // Create map of targets
    const targets = {};
    targetAllocation.forEach(t => targets[t.name] = t.percent);

    // Create map of current
    const current = {};
    currentHoldings.forEach(c => current[c.name] = c.value);

    // Check if targets sum to 100? Or just assume.
    
    for (const assetName in targets) {
        const targetPercent = targets[assetName];
        const targetValue = totalValue * (targetPercent / 100);
        const currentValue = current[assetName] || 0;
        const difference = targetValue - currentValue;

        actions.push({
            name: assetName,
            currentValue: currentValue,
            targetValue: Number(targetValue.toFixed(2)),
            difference: Number(difference.toFixed(2)),
            action: difference > 0 ? "BUY" : "SELL"
        });
    }

    return actions;
}

/**
 * Calculates the real value of an investment adjusted for inflation.
 * @param {number} futureValue - Nominal future value.
 * @param {number} inflationRate - Annual inflation rate (percent).
 * @param {number} years - Number of years.
 * @returns {number} Real value (present purchasing power).
 */
function calculateInflationImpact(futureValue, inflationRate, years) {
    if (years < 0) throw new Error("Invalid input parameters");
    
    // PV = FV / (1 + r)^n
    const r = inflationRate / 100;
    const realValue = futureValue / Math.pow(1 + r, years);
    
    return Number(realValue.toFixed(2));
}

module.exports = {
    calculateCompoundInterest,
    forecastPortfolioGrowth,
    runMonteCarloSimulation,
    calculateAssetAllocation,
    calculateInflationImpact
};
