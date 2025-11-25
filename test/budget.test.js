const assert = require('assert');
const budget = require('../src/budget');

describe('Budget Module', () => {
    describe('calculateSavingsRate', () => {
        it('should calculate savings rate correctly', () => {
            const rate = budget.calculateSavingsRate(5000, 4000);
            // (1000 / 5000) * 100 = 20%
            assert.strictEqual(rate, 20.00);
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
    });

    describe('forecastBudget', () => {
        it('should forecast future budget', () => {
            const result = budget.forecastBudget(50000, 3, 10);
            // 50000 * (1.03)^10 = 67195.82
            assert.strictEqual(result.futureBudget, 67195.82);
        });
    });
});
