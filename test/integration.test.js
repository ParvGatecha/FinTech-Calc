const assert = require('assert');
const realEstate = require('../src/realEstate');
const investment = require('../src/investment');
const loan = require('../src/loan');
const creditCard = require('../src/creditCard');
const budget = require('../src/budget');
const retirement = require('../src/retirement');

describe('Integration Tests', () => {
    
    describe('Scenario 1: Net Worth Calculation', () => {
        it('should calculate total net worth from assets and liabilities', () => {
            // Assets
            const propertyValue = 500000;
            const portfolioBalance = 150000;
            const cashSavings = 20000;
            
            // Liabilities
            const mortgagePrincipal = 350000;
            const creditCardDebt = 5000;
            const studentLoan = 25000;

            // 1. Project Property Value in 5 years (Real Estate)
            const projectedProperty = realEstate.calculateAppreciation(propertyValue, 3, 5).futureValue;
            
            // 2. Project Portfolio Growth in 5 years (Investment)
            const projectedPortfolio = investment.calculateCompoundInterest(portfolioBalance, 7, 5, 12);
            
            // 3. Calculate Remaining Mortgage Balance in 5 years (Loan)
            // Assuming 4% rate, 30 year term
            const mortgageSchedule = loan.calculateAmortizationSchedule(mortgagePrincipal, 4, 30);
            // Get balance at month 60 (5 years * 12)
            const remainingMortgage = mortgageSchedule[59].balance;

            // 4. Calculate Credit Card Payoff (Credit Card)
            // Assuming paying $200/mo at 18%
            const monthsToPayOffCC = creditCard.calculatePayoffTime(creditCardDebt, 18, 200);
            // If payoff < 60 months, debt is 0.
            const remainingCC = monthsToPayOffCC < 60 ? 0 : 5000; // Simplified

            // Total Net Worth in 5 Years
            const totalAssets = projectedProperty + projectedPortfolio + cashSavings; // Assuming cash stays flat
            const totalLiabilities = remainingMortgage + remainingCC + studentLoan; // Assuming student loan flat
            
            const netWorth = totalAssets - totalLiabilities;

            console.log(`    Projected Net Worth (5 Years): $${netWorth.toFixed(2)}`);
            
            assert.ok(netWorth > 0, "Net worth should be positive");
            assert.ok(projectedProperty > propertyValue, "Property should appreciate");
            assert.ok(remainingMortgage < mortgagePrincipal, "Mortgage should decrease");
        });
    });

    describe('Scenario 2: Comprehensive Financial Health Check', () => {
        it('should assess overall financial health', () => {
            const income = 8000; // Monthly
            const expenses = 5000; // Monthly
            const debts = 1500; // Monthly debt payments
            const savings = 50000;
            const age = 35;

            // 1. Savings Rate (Budget)
            const savingsRate = budget.calculateSavingsRate(income, expenses);
            
            // 2. DTI Ratio (Budget)
            const dti = budget.calculateDebtToIncomeRatio(debts, income);
            
            // 3. Emergency Fund Coverage (Budget)
            const emergencyFundNeeded = budget.calculateEmergencyFund(expenses, 6);
            const hasEmergencyFund = savings >= emergencyFundNeeded;

            // 4. Retirement Readiness (Retirement)
            // Saving remaining income: 8000 - 5000 - 1500 = 1500/mo = 18000/yr
            const annualSavings = (income - expenses - debts) * 12;
            const retirementCheck = retirement.assessRetirementReadiness(
                savings, 
                annualSavings, 
                expenses * 12 * 0.8, // 80% replacement
                30, // Years to retire
                25, // Years in retirement
                7, // Return
                10 // Volatility
            );

            console.log(`    Savings Rate: ${savingsRate}%`);
            console.log(`    DTI Ratio: ${dti}%`);
            console.log(`    Emergency Fund: ${hasEmergencyFund ? 'Funded' : 'Underfunded'}`);
            console.log(`    Retirement Status: ${retirementCheck.recommendation} (${retirementCheck.successProbability}%)`);

            assert.ok(savingsRate > 0);
            assert.ok(dti < 43); // Standard guideline
            assert.strictEqual(typeof retirementCheck.successProbability, 'number');
        });
    });
});
