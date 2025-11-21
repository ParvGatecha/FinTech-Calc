/**
 * Financial Statistics Module
 * Provides functions for statistical analysis of financial data.
 */

/**
 * Calculates the Net Present Value (NPV) of a series of cash flows.
 * @param {number} rate - The discount rate (as a percentage, e.g., 5 for 5%).
 * @param {Array<number>} cashFlows - An array of cash flows, where index 0 is the initial investment (usually negative).
 * @returns {number} The NPV.
 */
function calculateNPV(rate, cashFlows) {
    if (typeof rate !== 'number' || !Array.isArray(cashFlows)) {
        throw new Error("Invalid input parameters");
    }

    const r = rate / 100;
    let npv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + r, t);
    }

    return Number(npv.toFixed(2));
}

/**
 * Calculates the Internal Rate of Return (IRR) for a series of cash flows.
 * Uses the Newton-Raphson method for approximation.
 * @param {Array<number>} cashFlows - An array of cash flows.
 * @param {number} [guess=0.1] - Initial guess for the IRR (default 10%).
 * @returns {number} The IRR as a percentage.
 */
function calculateIRR(cashFlows, guess = 0.1) {
    if (!Array.isArray(cashFlows) || cashFlows.length === 0) {
        throw new Error("Invalid cash flows");
    }

    // Check if there is at least one positive and one negative cash flow
    let hasPositive = false;
    let hasNegative = false;
    for (const flow of cashFlows) {
        if (flow > 0) hasPositive = true;
        if (flow < 0) hasNegative = true;
    }
    if (!hasPositive || !hasNegative) {
        throw new Error("Cash flows must contain at least one positive and one negative value");
    }

    const maxIterations = 1000;
    const precision = 1e-6;
    let rate = guess;

    for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let derivativeNpv = 0;

        for (let t = 0; t < cashFlows.length; t++) {
            const denominator = Math.pow(1 + rate, t);
            npv += cashFlows[t] / denominator;
            
            if (t > 0) {
                // Derivative of CF / (1+r)^t is -t * CF / (1+r)^(t+1)
                derivativeNpv -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
            }
        }

        if (Math.abs(npv) < precision) {
            return Number((rate * 100).toFixed(2));
        }

        if (derivativeNpv === 0) {
            throw new Error("IRR calculation failed: derivative is zero");
        }

        const newRate = rate - npv / derivativeNpv;
        
        // If rate jumps too far or becomes invalid, we might fail or clamp
        // For this implementation, we'll just update.
        if (Math.abs(newRate - rate) < precision) {
             return Number((newRate * 100).toFixed(2));
        }
        
        rate = newRate;
    }

    throw new Error("IRR calculation did not converge");
}

/**
 * Calculates the standard deviation of a set of returns.
 * @param {Array<number>} returns - An array of percentage returns (e.g., [5, 10, -2]).
 * @returns {number} The standard deviation.
 */
function calculateStandardDeviation(returns) {
    if (!Array.isArray(returns) || returns.length === 0) {
        throw new Error("Invalid returns data");
    }

    if (returns.length === 1) return 0;

    const mean = returns.reduce((sum, val) => sum + val, 0) / returns.length;
    
    const squaredDiffs = returns.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / (returns.length - 1); // Sample standard deviation

    return Number(Math.sqrt(variance).toFixed(4));
}

/**
 * Calculates the Sharpe Ratio.
 * @param {Array<number>} returns - An array of percentage returns.
 * @param {number} riskFreeRate - The risk-free rate (as a percentage).
 * @returns {number} The Sharpe Ratio.
 */
function calculateSharpeRatio(returns, riskFreeRate) {
    if (!Array.isArray(returns) || typeof riskFreeRate !== 'number') {
        throw new Error("Invalid input parameters");
    }

    const meanReturn = returns.reduce((sum, val) => sum + val, 0) / returns.length;
    const stdDev = calculateStandardDeviation(returns);

    if (stdDev === 0) {
        throw new Error("Standard deviation is zero, cannot calculate Sharpe Ratio");
    }

    const excessReturn = meanReturn - riskFreeRate;
    return Number((excessReturn / stdDev).toFixed(4));
}

module.exports = {
    calculateNPV,
    calculateIRR,
    calculateStandardDeviation,
    calculateSharpeRatio
};
