/**
 * Cryptocurrency Analysis Module
 * Provides tools for analyzing crypto investments.
 */

/**
 * Calculates Return on Investment (ROI).
 * @param {number} invested - Total amount invested.
 * @param {number} currentValue - Current value of holdings.
 * @returns {number} ROI percentage.
 */
function calculateCryptoROI(invested, currentValue) {
    if (invested <= 0) throw new Error("Invested amount must be positive");
    
    const profit = currentValue - invested;
    return Number(((profit / invested) * 100).toFixed(2));
}

/**
 * Calculates staking rewards.
 * @param {number} amount - Amount staked.
 * @param {number} apy - Annual Percentage Yield (percent).
 * @param {number} years - Duration in years.
 * @returns {Object} Total rewards and final balance.
 */
function calculateStakingRewards(amount, apy, years) {
    if (amount < 0 || apy < 0 || years < 0) throw new Error("Invalid input parameters");

    const r = apy / 100;
    const finalBalance = amount * Math.pow(1 + r, years);
    const rewards = finalBalance - amount;

    return {
        rewards: Number(rewards.toFixed(4)),
        finalBalance: Number(finalBalance.toFixed(4))
    };
}

/**
 * Calculates Impermanent Loss in a liquidity pool.
 * @param {number} priceChangeRatio - Ratio of new price to old price (e.g., 1.10 for 10% increase).
 * @returns {number} Impermanent loss percentage (negative value).
 */
function calculateImpermanentLoss(priceChangeRatio) {
    if (priceChangeRatio <= 0) throw new Error("Price change ratio must be positive");

    // Formula: 2 * sqrt(ratio) / (1 + ratio) - 1
    const loss = (2 * Math.sqrt(priceChangeRatio) / (1 + priceChangeRatio)) - 1;
    
    return Number((loss * 100).toFixed(2));
}

/**
 * Calculates Dollar Cost Average (DCA).
 * @param {Array<Object>} purchases - Array of { amount, price }.
 * @returns {Object} Average price and total holdings.
 */
function calculateDollarCostAverage(purchases) {
    if (!Array.isArray(purchases) || purchases.length === 0) throw new Error("Invalid purchases array");

    let totalCost = 0;
    let totalCoins = 0;

    for (const p of purchases) {
        if (p.amount <= 0 || p.price <= 0) continue;
        
        const coins = p.amount / p.price;
        totalCost += p.amount;
        totalCoins += coins;
    }

    if (totalCoins === 0) return { averagePrice: 0, totalCoins: 0, totalCost: 0 };

    const averagePrice = totalCost / totalCoins;

    return {
        averagePrice: Number(averagePrice.toFixed(2)),
        totalCoins: Number(totalCoins.toFixed(6)),
        totalCost: Number(totalCost.toFixed(2))
    };
}

module.exports = {
    calculateCryptoROI,
    calculateStakingRewards,
    calculateImpermanentLoss,
    calculateDollarCostAverage
};
