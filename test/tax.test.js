const { expect } = require('chai');
const { calculateIncomeTax, calculateEffectiveTaxRate, calculateCapitalGains, estimateTaxLiability } = require('../src/tax');

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

        it('should calculate tax correctly at bracket boundary (10000)', () => {
            // 10000 * 0.10 = 1000
            const tax = calculateIncomeTax(10000, brackets);
            expect(tax).to.equal(1000);
        });

        it('should calculate tax correctly at bracket boundary (30000)', () => {
            // 10000 * 0.10 = 1000
            // 20000 * 0.15 = 3000
            // Total = 4000
            const tax = calculateIncomeTax(30000, brackets);
            expect(tax).to.equal(4000);
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

    describe('calculateCapitalGains', () => {
        it('should calculate long-term gains correctly', () => {
            // Buy 1000, Sell 2000, Held 2 years, Income 50000 -> 15% rate
            // Gain 1000. Tax 150.
            const result = calculateCapitalGains(1000, 2000, 2, 50000);
            expect(result.gain).to.equal(1000);
            expect(result.type).to.equal('Long-term');
            expect(result.taxAmount).to.equal(150);
        });

        it('should calculate short-term gains correctly', () => {
            // Buy 1000, Sell 2000, Held 0.5 years -> 22% rate (simplified)
            // Gain 1000. Tax 220.
            const result = calculateCapitalGains(1000, 2000, 0.5, 50000);
            expect(result.type).to.equal('Short-term');
            expect(result.taxAmount).to.equal(220);
        });

        it('should handle holding period exactly 1 year (Long-term)', () => {
            const result = calculateCapitalGains(1000, 2000, 1.0, 50000);
            expect(result.type).to.equal('Long-term');
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateCapitalGains(-1000, 2000, 2, 50000)).to.throw("Invalid input parameters");
            expect(() => calculateCapitalGains(1000, -2000, 2, 50000)).to.throw("Invalid input parameters");
            expect(() => calculateCapitalGains(1000, 2000, -2, 50000)).to.throw("Invalid input parameters");
            expect(() => calculateCapitalGains(1000, 2000, 2, -50000)).to.throw("Invalid input parameters");
        });
    });

    describe('estimateTaxLiability', () => {
        it('should apply standard deduction', () => {
            // Single, Income 20000. Deduction 12950. Taxable 7050.
            // Tax = 7050 * 0.10 = 705
            const tax = estimateTaxLiability(20000, 'single');
            expect(tax).to.equal(705);
        });

        it('should apply itemized deduction if higher', () => {
            // Single, Income 20000. Itemized 15000. Taxable 5000.
            // Tax = 5000 * 0.10 = 500
            const tax = estimateTaxLiability(20000, 'single', 15000);
            expect(tax).to.equal(500);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => estimateTaxLiability(-20000, 'single')).to.throw("Invalid input parameters");
            expect(() => estimateTaxLiability(20000, 'single', -100)).to.throw("Invalid input parameters");
        });
    });
});
