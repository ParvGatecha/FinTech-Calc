// @ts-nocheck
const { expect } = require('chai');
const { calculateMonthlyPayment, calculateAmortizationSchedule } = require('../src/loan');

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

        it('should verify specific schedule values', () => {
            const schedule = calculateAmortizationSchedule(1000, 10, 1);
            // Monthly payment: 1000 * (0.10/12) / (1 - (1+0.10/12)^-12) = 87.915... -> 87.92
            expect(schedule[0].payment).to.equal(87.92);
            expect(schedule[0].interestPayment).to.equal(8.33); // 1000 * 0.10/12 = 8.333...
            expect(schedule[0].principalPayment).to.equal(79.59); // 87.92 - 8.33
            expect(schedule[0].balance).to.equal(920.41); // 1000 - 79.59
        });
    });
});
