/**
 * Credit Card Analysis Module
 * Provides tools for managing and analyzing credit card debt.
 */

/**
 * Calculates the number of months to pay off a credit card balance.
 * @param {number} balance - Current balance.
 * @param {number} interestRate - Annual Percentage Rate (APR).
 * @param {number} monthlyPayment - Fixed monthly payment amount.
 * @returns {number} Months to payoff.
 */
function calculatePayoffTime(balance, interestRate, monthlyPayment) {
    if (balance <= 0) return 0;
    if (interestRate < 0 || monthlyPayment <= 0) throw new Error("Invalid input parameters");

    const monthlyRate = interestRate / 100 / 12;
    
    // Check if payment covers interest
    if (balance * monthlyRate >= monthlyPayment) {
        throw new Error("Monthly payment is too low to cover interest");
    }

    // N = -log(1 - (r * B) / P) / log(1 + r)
    const numerator = Math.log(1 - (monthlyRate * balance) / monthlyPayment);
    const denominator = Math.log(1 + monthlyRate);
    
    const months = -numerator / denominator;
    
    return Math.ceil(months);
}

/**
 * Calculates total interest charges over a period.
 * @param {number} balance - Starting balance.
 * @param {number} interestRate - APR.
 * @param {number} months - Number of months.
 * @returns {number} Total interest charged.
 */
function calculateInterestCharges(balance, interestRate, months) {
    if (balance < 0 || interestRate < 0 || months < 0) throw new Error("Invalid input parameters");

    const monthlyRate = interestRate / 100 / 12;
    const futureValue = balance * Math.pow(1 + monthlyRate, months);
    
    return Number((futureValue - balance).toFixed(2));
}

/**
 * Estimates the minimum monthly payment.
 * @param {number} balance - Current balance.
 * @param {number} minPaymentRate - Minimum payment percentage (e.g., 2%).
 * @returns {number} Minimum payment amount.
 */
function calculateMinimumPayment(balance, minPaymentRate) {
    if (balance < 0 || minPaymentRate < 0) throw new Error("Invalid input parameters");
    
    const payment = balance * (minPaymentRate / 100);
    // Usually there's a floor, e.g., $25. Let's assume a $25 floor or the balance if lower.
    const floor = 25;
    
    if (balance < floor) return balance;
    return Number(Math.max(payment, floor).toFixed(2));
}

/**
 * Compares two credit cards based on rewards and fees.
 * @param {Object} card1 - { name, annualFee, rewardRate (percent) }.
 * @param {Object} card2 - { name, annualFee, rewardRate (percent) }.
 * @param {number} annualSpend - Total annual spending.
 * @returns {Object} Comparison result.
 */
function compareCards(card1, card2, annualSpend) {
    if (annualSpend < 0) throw new Error("Annual spend cannot be negative");

    const calculateNetValue = (card) => {
        const rewards = annualSpend * (card.rewardRate / 100);
        return rewards - card.annualFee;
    };

    const net1 = calculateNetValue(card1);
    const net2 = calculateNetValue(card2);

    let betterCard = null;
    if (net1 > net2) betterCard = card1.name;
    else if (net2 > net1) betterCard = card2.name;
    else betterCard = "Equal";

    return {
        [card1.name]: Number(net1.toFixed(2)),
        [card2.name]: Number(net2.toFixed(2)),
        betterChoice: betterCard,
        difference: Number(Math.abs(net1 - net2).toFixed(2))
    };
}

module.exports = {
    calculatePayoffTime,
    calculateInterestCharges,
    calculateMinimumPayment,
    compareCards
};
