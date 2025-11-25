const fc = require('fast-check');
const { expect } = require('chai');
const loan = require('../src/loan');
const investment = require('../src/investment');
const tax = require('../src/tax');
const budget = require('../src/budget');
const creditCard = require('../src/creditCard');
const crypto = require('../src/crypto');
const currency = require('../src/currency');
const realEstate = require('../src/realEstate');
const retirement = require('../src/retirement');
const statistics = require('../src/statistics');

describe('Fuzz Testing', () => {


    describe('Loan Module', () => {
        it('calculateMonthlyPayment should always return a positive number for valid inputs', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 1000, max: 1000000, noNaN: true, noInfinity: true }), // Principal
                    fc.double({ min: 0.1, max: 20, noNaN: true, noInfinity: true }),   // Rate
                    fc.integer({ min: 1, max: 30 }),     // Years
                    (principal, rate, years) => {
                        const payment = loan.calculateMonthlyPayment(principal, rate, years);
                        expect(payment).to.be.a('number');
                        expect(payment).to.be.finite;
                        expect(payment).to.be.greaterThan(0);
                    }
                )
            );
        });


    });

    describe('Investment Module', () => {
        it('calculateCompoundInterest should always return amount >= principal', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 1, max: 1000000, noNaN: true, noInfinity: true }), // Principal
                    fc.double({ min: 0, max: 100, noNaN: true, noInfinity: true }),     // Rate
                    fc.integer({ min: 1, max: 50 }),     // Years
                    fc.integer({ min: 1, max: 12 }),     // Frequency
                    (principal, rate, years, frequency) => {
                        const result = investment.calculateCompoundInterest(principal, rate, years, frequency);
                        expect(result).to.be.gte(principal - 0.01);
                    }
                )
            );
        });
    });

    describe('Budget Module', () => {
        it('calculateSavingsRate should return a percentage <= 100 for positive income', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 1000, max: 1000000, noNaN: true, noInfinity: true }), // Income
                    fc.double({ min: 0, max: 1000000, noNaN: true, noInfinity: true }),    // Expenses
                    (income, expenses) => {
                        const rate = budget.calculateSavingsRate(income, expenses);
                        expect(rate).to.be.a('number');
                        expect(rate).to.be.lte(100);
                    }
                )
            );
        });
    });

    describe('Credit Card Module', () => {
        it('calculateInterestCharges should return non-negative interest', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 0, max: 100000, noNaN: true, noInfinity: true }), // Balance
                    fc.double({ min: 0, max: 30, noNaN: true, noInfinity: true }),     // Rate
                    fc.integer({ min: 1, max: 60 }),     // Months
                    (balance, rate, months) => {
                        const interest = creditCard.calculateInterestCharges(balance, rate, months);
                        expect(interest).to.be.gte(0);
                    }
                )
            );
        });
    });

    describe('Crypto Module', () => {
        it('calculateCryptoROI should return a finite number', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 1, max: 1000000, noNaN: true, noInfinity: true }), // Invested
                    fc.double({ min: 0, max: 1000000, noNaN: true, noInfinity: true }), // Current Value
                    (invested, current) => {
                        const roi = crypto.calculateCryptoROI(invested, current);
                        expect(roi).to.be.a('number');
                        expect(roi).to.be.finite;
                    }
                )
            );
        });
    });

    describe('Currency Module', () => {
        it('convertCurrency should correctly convert based on rates', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 0, max: 1000000, noNaN: true, noInfinity: true }), // Amount
                    fc.double({ min: 0.1, max: 10, noNaN: true, noInfinity: true }),    // Rate
                    (amount, rate) => {
                        const rates = { 'USD': 1, 'EUR': rate };
                        const converted = currency.convertCurrency(amount, 'USD', 'EUR', rates);
                        expect(converted).to.be.closeTo(amount * rate, 0.01);
                    }
                )
            );
        });
    });

    describe('Real Estate Module', () => {
        it('calculateMortgageMax should return non-negative max mortgage', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 30000, max: 500000, noNaN: true, noInfinity: true }), // Income
                    fc.double({ min: 0, max: 5000, noNaN: true, noInfinity: true }),       // Debts
                    fc.double({ min: 0.1, max: 10, noNaN: true, noInfinity: true }),         // Rate
                    fc.integer({ min: 10, max: 30 }),    // Years
                    (income, debts, rate, years) => {
                        const result = realEstate.calculateMortgageMax(income, debts, rate, years);
                        expect(result.maxMortgage).to.be.gte(0);
                        expect(result.maxMonthlyPayment).to.be.gte(0);
                    }
                )
            );
        });
    });

    describe('Retirement Module', () => {
        it('calculate401kProjection should return final balance >= current balance (positive growth)', () => {
            fc.assert(
                fc.property(
                    fc.double({ min: 0, max: 1000000, noNaN: true, noInfinity: true }), // Current Balance
                    fc.double({ min: 0, max: 50000, noNaN: true, noInfinity: true }),   // Contribution
                    fc.double({ min: 0, max: 10, noNaN: true, noInfinity: true }),      // Match
                    fc.double({ min: 0, max: 15, noNaN: true, noInfinity: true }),      // Return
                    fc.integer({ min: 1, max: 40 }),     // Years
                    fc.double({ min: 30000, max: 200000, noNaN: true, noInfinity: true }), // Salary
                    fc.double({ min: 0, max: 5, noNaN: true, noInfinity: true }),       // Salary Growth
                    (balance, contribution, match, annualReturn, years, salary, growth) => {
                        const result = retirement.calculate401kProjection(balance, contribution, match, annualReturn, years, salary, growth);
                        expect(result.finalBalance).to.be.gte(balance - 0.01);
                    }
                )
            );
        });
    });

    describe('Statistics Module', () => {
        it('calculateStandardDeviation should return non-negative value', () => {
            fc.assert(
                fc.property(
                    fc.array(fc.double({ min: -100, max: 100, noNaN: true, noInfinity: true }), { minLength: 2, maxLength: 20 }),
                    (returns) => {
                        const stdDev = statistics.calculateStandardDeviation(returns);
                        expect(stdDev).to.be.gte(0);
                    }
                )
            );
        });
    });

    describe('Tax Module', () => {
        it('calculateIncomeTax should return non-negative tax less than income', () => {
            const brackets = [
                { rate: 0.10, max: 10000 },
                { rate: 0.20, max: 50000 },
                { rate: 0.30, max: Infinity }
            ];

            fc.assert(
                fc.property(
                    fc.double({ min: 0, max: 1000000, noNaN: true, noInfinity: true }), // Income
                    (income) => {
                        const taxAmount = tax.calculateIncomeTax(income, brackets);
                        expect(taxAmount).to.be.gte(0);
                        expect(taxAmount).to.be.lte(income + 0.01);
                    }
                )
            );
        });
    });
});
