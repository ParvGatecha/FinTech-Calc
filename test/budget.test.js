const assert = require('assert');
const budget = require('../src/budget');

describe('Budget Module', () => {
    describe('calculateSavingsRate', () => {
        it('should calculate savings rate correctly', () => {
            const rate = budget.calculateSavingsRate(5000, 4000);
            // (1000 / 5000) * 100 = 20%
            assert.strictEqual(rate, 20.00);
        });

        it('should handle zero savings (income = expenses)', () => {
            const rate = budget.calculateSavingsRate(5000, 5000);
            assert.strictEqual(rate, 0.00);
        });

        it('should handle zero expenses (100% savings)', () => {
            const rate = budget.calculateSavingsRate(5000, 0);
            assert.strictEqual(rate, 100.00);
        });

        it('should handle negative savings (expenses > income)', () => {
            const rate = budget.calculateSavingsRate(5000, 6000);
            // -1000 / 5000 = -20%
            assert.strictEqual(rate, -20.00);
        });

        it('should throw error for zero income', () => {
            assert.throws(() => budget.calculateSavingsRate(0, 100), /Income must be positive/);
        });

        it('should throw error for negative income', () => {
            assert.throws(() => budget.calculateSavingsRate(-100, 100), /Income must be positive/);
        });

        it('should throw error for negative expenses', () => {
            assert.throws(() => budget.calculateSavingsRate(1000, -100), /Expenses cannot be negative/);
        });
    });

    describe('analyzeExpenses', () => {
        it('should analyze expenses correctly', () => {
            const expenses = [
                { category: 'Food', amount: 500 },
                { category: 'Rent', amount: 1500 },
                { category: 'Food', amount: 200 }
            ];
            const result = budget.analyzeExpenses(expenses);
            
            assert.strictEqual(result.totalExpenses, 2200.00);
            assert.strictEqual(result.categoryTotals['Food'], 700);
            assert.strictEqual(result.categoryTotals['Rent'], 1500);
            assert.strictEqual(result.topExpenseCategory, 'Rent');
        });

        it('should handle empty expenses array', () => {
            const result = budget.analyzeExpenses([]);
            assert.strictEqual(result.totalExpenses, 0);
            assert.strictEqual(result.topExpenseCategory, null);
        });

        it('should throw error for invalid input', () => {
            assert.throws(() => budget.analyzeExpenses(null), /Invalid input parameters/);
            assert.throws(() => budget.analyzeExpenses("not an array"), /Invalid input parameters/);
        });

        it('should ignore negative expense amounts', () => {
            const expenses = [
                { category: 'Food', amount: 100 },
                { category: 'Rent', amount: -500 }
            ];
            const result = budget.analyzeExpenses(expenses);
            assert.strictEqual(result.totalExpenses, 100);
        });

        it('should include zero amount expenses', () => {
            const expenses = [
                { category: 'Food', amount: 100 },
                { category: 'Misc', amount: 0 }
            ];
            const result = budget.analyzeExpenses(expenses);
            assert.strictEqual(result.categoryTotals['Misc'], 0);
            assert.ok('Misc' in result.categoryTotals);
        });

        it('should break ties by picking the first category', () => {
            const expenses = [
                { category: 'Food', amount: 500 },
                { category: 'Rent', amount: 500 }
            ];
            const result = budget.analyzeExpenses(expenses);
            assert.strictEqual(result.topExpenseCategory, 'Food');
        });
    });

    describe('calculateEmergencyFund', () => {
        it('should calculate emergency fund', () => {
            const fund = budget.calculateEmergencyFund(3000, 6);
            assert.strictEqual(fund, 18000.00);
        });
    });

    describe('calculateDebtToIncomeRatio', () => {
        it('should calculate DTI', () => {
            const dti = budget.calculateDebtToIncomeRatio(2000, 6000);
            // 33.33%
            assert.strictEqual(dti, 33.33);
        });

        it('should handle zero debt', () => {
            const dti = budget.calculateDebtToIncomeRatio(0, 6000);
            assert.strictEqual(dti, 0.00);
        });
    });

    describe('forecastBudget', () => {
        it('should forecast future budget', () => {
            const result = budget.forecastBudget(50000, 3, 10);
            // 50000 * (1.03)^10 = 67195.82
            assert.strictEqual(result.futureBudget, 67195.82);
        });
    });
});
