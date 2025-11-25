/**
 * Budgeting and Expense Analysis Module
 * Provides tools for personal finance budgeting and forecasting.
 */

/**
 * Calculates the savings rate.
 * @param {number} income - Total income (usually monthly or annual).
 * @param {number} expenses - Total expenses.
 * @returns {number} Savings rate percentage.
 */
function calculateSavingsRate(income, expenses) {
    if (income <= 0) throw new Error("Income must be positive");
    if (expenses < 0) throw new Error("Expenses cannot be negative");

    const savings = income - expenses;
    return Number(((savings / income) * 100).toFixed(2));
}

/**
 * Analyzes expenses to provide breakdown and statistics.
 * @param {Array<Object>} expenses - Array of { category, amount }.
 * @returns {Object} Analysis including total, breakdown by category, and top expense.
 */
function analyzeExpenses(expenses) {
    if (!Array.isArray(expenses)) throw new Error("Invalid input parameters");

    let total = 0;
    const breakdown = {};
    let maxAmount = 0;
    let topCategory = null;

    for (const item of expenses) {
        if (item.amount < 0) continue; // Skip negative expenses
        
        total += item.amount;
        
        if (!breakdown[item.category]) {
            breakdown[item.category] = 0;
        }
        breakdown[item.category] += item.amount;

        if (item.amount > maxAmount) {
            maxAmount = item.amount;
            topCategory = item.category;
        }
    }

    // Calculate percentages
    const percentageBreakdown = {};
    for (const cat in breakdown) {
        percentageBreakdown[cat] = Number(((breakdown[cat] / total) * 100).toFixed(2));
    }

    return {
        totalExpenses: Number(total.toFixed(2)),
        categoryTotals: breakdown,
        categoryPercentages: percentageBreakdown,
        topExpenseCategory: topCategory
    };
}

/**
 * Calculates the required emergency fund size.
 * @param {number} monthlyExpenses - Average monthly expenses.
 * @param {number} months - Number of months of coverage desired (e.g., 3-6).
 * @returns {number} Total emergency fund needed.
 */
function calculateEmergencyFund(monthlyExpenses, months) {
    if (monthlyExpenses < 0 || months < 0) throw new Error("Invalid input parameters");
    
    return Number((monthlyExpenses * months).toFixed(2));
}

/**
 * Calculates Debt-to-Income (DTI) ratio.
 * @param {number} monthlyDebtPayments - Total monthly debt obligations.
 * @param {number} grossMonthlyIncome - Gross monthly income.
 * @returns {number} DTI percentage.
 */
function calculateDebtToIncomeRatio(monthlyDebtPayments, grossMonthlyIncome) {
    if (grossMonthlyIncome <= 0) throw new Error("Income must be positive");
    if (monthlyDebtPayments < 0) throw new Error("Debt payments cannot be negative");

    return Number(((monthlyDebtPayments / grossMonthlyIncome) * 100).toFixed(2));
}

/**
 * Forecasts future budget needs based on inflation.
 * @param {number} currentBudget - Current annual budget/expenses.
 * @param {number} inflationRate - Annual inflation rate (percent).
 * @param {number} years - Number of years to project.
 * @returns {Object} Future budget requirement and total increase.
 */
function forecastBudget(currentBudget, inflationRate, years) {
    if (currentBudget < 0 || years < 0) throw new Error("Invalid input parameters");

    const r = inflationRate / 100;
    const futureBudget = currentBudget * Math.pow(1 + r, years);
    const increase = futureBudget - currentBudget;

    return {
        futureBudget: Number(futureBudget.toFixed(2)),
        totalIncrease: Number(increase.toFixed(2))
    };
}

module.exports = {
    calculateSavingsRate,
    analyzeExpenses,
    calculateEmergencyFund,
    calculateDebtToIncomeRatio,
    forecastBudget
};
