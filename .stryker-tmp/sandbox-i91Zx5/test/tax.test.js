// @ts-nocheck
const { expect } = require('chai');
const { calculateIncomeTax, calculateEffectiveTaxRate } = require('../src/tax');

describe('Tax Module', () => {
    const brackets = [
        { rate: 0.10, max: 10000 },
        { rate: 0.15, max: 30000 },
        { rate: 0.25, max: Infinity }
    ];

    describe('calculateIncomeTax', () => {
        it('should calculate tax correctly for first bracket', () => {
            const tax = calculateIncomeTax(5000, brackets);
            expect(tax).to.equal(500);
        });

        it('should calculate tax correctly for second bracket', () => {
            const tax = calculateIncomeTax(20000, brackets);
            // 10000 * 0.10 = 1000
            // 10000 * 0.15 = 1500
            expect(tax).to.equal(2500);
        });

        it('should calculate tax correctly for top bracket', () => {
            const tax = calculateIncomeTax(50000, brackets);
            // 10000 * 0.10 = 1000
            // 20000 * 0.15 = 3000
            // 20000 * 0.25 = 5000
            expect(tax).to.equal(9000);
        });

        it('should throw error for negative income', () => {
            expect(() => calculateIncomeTax(-100, brackets)).to.throw("Income cannot be negative");
        });

        it('should handle zero income', () => {
            const tax = calculateIncomeTax(0, brackets);
            expect(tax).to.equal(0);
        });

        it('should throw error for invalid brackets', () => {
            expect(() => calculateIncomeTax(1000, null)).to.throw("Invalid tax brackets");
            expect(() => calculateIncomeTax(1000, [])).to.throw("Invalid tax brackets");
        });
    });

    describe('calculateEffectiveTaxRate', () => {
        it('should calculate effective rate correctly', () => {
            const rate = calculateEffectiveTaxRate(50000, 9000);
            expect(rate).to.equal(18);
        });

        it('should handle zero income', () => {
            const rate = calculateEffectiveTaxRate(0, 0);
            expect(rate).to.equal(0);
        });
    });
});
