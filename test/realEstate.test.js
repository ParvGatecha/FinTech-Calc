const assert = require('assert');
const { expect } = require('chai');
const realEstate = require('../src/realEstate');

describe('Real Estate Module', () => {
    describe('calculateMortgageMax', () => {
        it('should calculate max mortgage based on front-end ratio', () => {
            const result = realEstate.calculateMortgageMax(120000, 500, 4, 30);
            // Monthly Income = 10000
            // Front-end max = 2800
            // Back-end max = 3600 - 500 = 3100
            // Limit = 2800
            assert.strictEqual(result.maxMonthlyPayment, 2800);
            assert.strictEqual(result.limitingFactor, "Front-End Ratio (28%)");
        });

        it('should calculate max mortgage based on back-end ratio', () => {
            const result = realEstate.calculateMortgageMax(120000, 1500, 4, 30);
            // Monthly Income = 10000
            // Front-end max = 2800
            // Back-end max = 3600 - 1500 = 2100
            // Limit = 2100
            assert.strictEqual(result.maxMonthlyPayment, 2100);
            assert.strictEqual(result.limitingFactor, "Back-End Ratio (36%)");
        });

        it('should throw error for invalid inputs', () => {
            expect(() => realEstate.calculateMortgageMax(-1000, 500, 4, 30)).to.throw("Invalid input parameters");
            expect(() => realEstate.calculateMortgageMax(120000, -500, 4, 30)).to.throw("Invalid input parameters");
            expect(() => realEstate.calculateMortgageMax(120000, 500, -4, 30)).to.throw("Invalid input parameters");
            expect(() => realEstate.calculateMortgageMax(120000, 500, 4, 0)).to.throw("Invalid input parameters");
        });

        it('should handle zero income (return 0)', () => {
            const result = realEstate.calculateMortgageMax(0, 500, 4, 30);
            assert.strictEqual(result.maxMonthlyPayment, 0);
        });
    });

    describe('calculateRentalYield', () => {
        it('should calculate gross and net yield', () => {
            const result = realEstate.calculateRentalYield(24000, 300000, 8000);
            // Gross = 24000 / 300000 = 8%
            // Net = (24000 - 8000) / 300000 = 16000 / 300000 = 5.33%
            assert.strictEqual(result.grossYield, 8.00);
            assert.strictEqual(result.netYield, 5.33);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => realEstate.calculateRentalYield(-24000, 300000, 8000)).to.throw("Invalid input parameters");
            expect(() => realEstate.calculateRentalYield(24000, 0, 8000)).to.throw("Invalid input parameters");
            expect(() => realEstate.calculateRentalYield(24000, 300000, -8000)).to.throw("Invalid input parameters");
        });
    });

    describe('calculateCapRate', () => {
        it('should calculate cap rate correctly', () => {
            const capRate = realEstate.calculateCapRate(15000, 250000);
            // 15000 / 250000 = 0.06 = 6%
            assert.strictEqual(capRate, 6.00);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => realEstate.calculateCapRate(15000, 0)).to.throw("Property value must be positive");
            expect(() => realEstate.calculateCapRate(15000, -250000)).to.throw("Property value must be positive");
        });
    });

    describe('calculateCashOnCashReturn', () => {
        it('should calculate CoC return', () => {
            const coc = realEstate.calculateCashOnCashReturn(5000, 50000);
            // 5000 / 50000 = 10%
            assert.strictEqual(coc, 10.00);
        });

        it('should throw error for zero investment', () => {
            expect(() => realEstate.calculateCashOnCashReturn(5000, 0)).to.throw("Total cash invested cannot be zero");
        });
    });

    describe('calculateAppreciation', () => {
        it('should project property value', () => {
            const result = realEstate.calculateAppreciation(100000, 5, 10);
            // 100000 * (1.05)^10 = 162889.46
            assert.strictEqual(result.futureValue, 162889.46);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => realEstate.calculateAppreciation(-100000, 5, 10)).to.throw("Invalid input parameters");
            expect(() => realEstate.calculateAppreciation(100000, 5, -10)).to.throw("Invalid input parameters");
        });
    });

    describe('calculateClosingCosts', () => {
        it('should estimate closing costs', () => {
            const result = realEstate.calculateClosingCosts(300000, 1.0);
            // Base 3% = 9000
            assert.strictEqual(result.estimatedTotal, 9000.00);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => realEstate.calculateClosingCosts(-300000, 1.0)).to.throw("Invalid input parameters");
            expect(() => realEstate.calculateClosingCosts(300000, 0)).to.throw("Invalid input parameters");
        });
    });
});
