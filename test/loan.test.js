const { expect } = require('chai');
const { calculateMonthlyPayment, calculateAmortizationSchedule, calculateRefinanceImpact, calculateExtraPaymentSchedule, calculateBalloonPayment, calculateLoanAffordability } = require('../src/loan');

describe('Loan Module', () => {
    describe('calculateMonthlyPayment', () => {
        it('should calculate monthly payment correctly for standard input', () => {
            const payment = calculateMonthlyPayment(100000, 5, 30);
            expect(payment).to.be.closeTo(536.82, 0.01);
        });

        it('should handle zero interest rate', () => {
            const payment = calculateMonthlyPayment(100000, 0, 10);
            expect(payment).to.be.closeTo(833.33, 0.01);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateMonthlyPayment(-100, 5, 30)).to.throw("Invalid input parameters");
            expect(() => calculateMonthlyPayment(100000, -5, 30)).to.throw("Invalid input parameters");
            expect(() => calculateMonthlyPayment(100000, 5, 0)).to.throw("Invalid input parameters");
            expect(() => calculateMonthlyPayment(0, 5, 30)).to.throw("Invalid input parameters");
        });

        it('should handle high interest rate and short term', () => {
            // 1000, 100%, 1 year
            // r = 100/100/12 = 0.08333...
            // n = 12
            // P = 1000 * r * (1+r)^12 / ((1+r)^12 - 1)
            //   = 1000 * 0.08333 * 2.613 / 1.613
            //   = 83.33 * 1.6199... = ~134.99
            const payment = calculateMonthlyPayment(1000, 100, 1);
            expect(payment).to.be.closeTo(134.99, 0.1);
        });
    });

    describe('calculateAmortizationSchedule', () => {
        it('should generate correct number of payments', () => {
            const schedule = calculateAmortizationSchedule(10000, 5, 1);
            expect(schedule).to.have.lengthOf(12);
        });

        it('should have zero balance at the end', () => {
            const schedule = calculateAmortizationSchedule(10000, 5, 1);
            const lastPayment = schedule[schedule.length - 1];
            expect(lastPayment.balance).to.equal(0);
        });

        it('should handle short term schedule (1 year)', () => {
            const schedule = calculateAmortizationSchedule(1200, 0, 1);
            // 1200 / 12 = 100 per month
            expect(schedule).to.have.lengthOf(12);
            expect(schedule[11].balance).to.equal(0);
            expect(schedule[0].payment).to.equal(100);
        });

        it('should handle precision boundary in amortization', () => {
            // Crafted case where balance - principalPayment might be < 0.01 but > 0
            // This is hard to target exactly without fuzzing, but we can try small values
            const schedule = calculateAmortizationSchedule(100.05, 10, 1/12); // 1 month
            expect(schedule[0].balance).to.equal(0);
        });

        it('should verify specific schedule values', () => {
            const schedule = calculateAmortizationSchedule(1000, 10, 1);
            
            // Verify sequence
            expect(schedule[0].paymentNumber).to.equal(1);
            expect(schedule[11].paymentNumber).to.equal(12);

            // Monthly payment: 1000 * (0.10/12) / (1 - (1+0.10/12)^-12) = 87.915... -> 87.92
            expect(schedule[0].payment).to.equal(87.92);
            expect(schedule[0].interestPayment).to.equal(8.33); // 1000 * 0.10/12 = 8.333...
            expect(schedule[0].principalPayment).to.equal(79.58); 
            expect(schedule[0].balance).to.equal(920.42);

            // Verify last payment adjustment
            const lastPayment = schedule[11];
            expect(lastPayment.balance).to.equal(0);
            // Previous balance should be equal to last principal payment
            const prevBalance = schedule[10].balance;
            expect(lastPayment.principalPayment).to.equal(prevBalance);
        });
    });

    describe('calculateRefinanceImpact', () => {
        it('should calculate refinance savings correctly', () => {
            // Current: 200k, 5%, 25 years (300 months) remaining
            // New: 200k, 3.5%, 25 years, 3000 closing costs
            const result = calculateRefinanceImpact(200000, 5, 300, 3.5, 25, 3000);
            
            // Current Payment: ~1169.18
            // New Payment: ~1001.25
            // Monthly Savings: ~167.93
            // Break Even: 3000 / 167.93 = ~17.86 months -> 18 months
            expect(result.monthlySavings).to.be.greaterThan(0);
            expect(result.breakEvenMonths).to.equal(18);
        });

        it('should handle negative savings (bad refinance)', () => {
            const result = calculateRefinanceImpact(100000, 3, 120, 5, 10, 2000);
            expect(result.monthlySavings).to.be.lessThan(0);
            expect(result.breakEvenMonths).to.equal(Infinity);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateRefinanceImpact(0, 5, 300, 3.5, 25, 3000)).to.throw("Invalid input parameters");
            expect(() => calculateRefinanceImpact(200000, -5, 300, 3.5, 25, 3000)).to.throw("Invalid input parameters");
            expect(() => calculateRefinanceImpact(200000, 5, 0, 3.5, 25, 3000)).to.throw("Invalid input parameters");
            expect(() => calculateRefinanceImpact(200000, 5, 300, -3.5, 25, 3000)).to.throw("Invalid input parameters");
            expect(() => calculateRefinanceImpact(200000, 5, 300, 3.5, 0, 3000)).to.throw("Invalid input parameters");
            expect(() => calculateRefinanceImpact(200000, 5, 300, 3.5, 25, -100)).to.throw("Invalid input parameters");
        });
    });

    describe('calculateExtraPaymentSchedule', () => {
        it('should reduce term and save interest', () => {
            // 100k, 5%, 30 years. Payment ~536.82
            // Extra 100/month
            const result = calculateExtraPaymentSchedule(100000, 5, 30, 100);
            
            expect(result.newTermMonths).to.be.lessThan(360);
            expect(result.interestSaved).to.be.greaterThan(0);
        });

        it('should handle zero extra payment', () => {
            const result = calculateExtraPaymentSchedule(100000, 5, 30, 0);
            expect(result.newTermMonths).to.equal(360);
            expect(result.interestSaved).to.be.closeTo(0, 0.1);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateExtraPaymentSchedule(0, 5, 30, 100)).to.throw("Invalid input parameters");
            expect(() => calculateExtraPaymentSchedule(100000, -5, 30, 100)).to.throw("Invalid input parameters");
            expect(() => calculateExtraPaymentSchedule(100000, 5, 0, 100)).to.throw("Invalid input parameters");
            expect(() => calculateExtraPaymentSchedule(100000, 5, 30, -100)).to.throw("Invalid input parameters");
        });
    });

    describe('calculateBalloonPayment', () => {
        it('should calculate balloon payment loan correctly', () => {
            // 100k, 5%, 5 years, 50k balloon
            // PV Balloon = 50000 / (1.00416...)^60 = 50000 / 1.283... = 38978...
            // Amortized = 100000 - 38978 = 61021...
            // Payment on 61021 for 5 years = ~1151
            const payment = calculateBalloonPayment(100000, 5, 5, 50000);
            expect(payment).to.be.closeTo(1151, 10); // Approx check
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateBalloonPayment(0, 5, 5, 50000)).to.throw("Invalid input parameters");
            expect(() => calculateBalloonPayment(100000, -5, 5, 50000)).to.throw("Invalid input parameters");
            expect(() => calculateBalloonPayment(100000, 5, 0, 50000)).to.throw("Invalid input parameters");
            expect(() => calculateBalloonPayment(100000, 5, 5, -50000)).to.throw("Invalid input parameters");
        });
    });

    describe('calculateLoanAffordability', () => {
        it('should calculate max loan amount correctly', () => {
            const maxLoan = calculateLoanAffordability(1000, 5, 30);
            // Payment 1000, 5%, 30y -> Principal ~186281.62
            expect(maxLoan).to.be.closeTo(186281.62, 1);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateLoanAffordability(0, 5, 30)).to.throw("Invalid input parameters");
            expect(() => calculateLoanAffordability(1000, -5, 30)).to.throw("Invalid input parameters");
            expect(() => calculateLoanAffordability(1000, 5, 0)).to.throw("Invalid input parameters");
        });
    });
});
