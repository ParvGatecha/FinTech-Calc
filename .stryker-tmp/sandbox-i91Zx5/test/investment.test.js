// @ts-nocheck
const { expect } = require('chai');
const { calculateCompoundInterest, forecastPortfolioGrowth } = require('../src/investment');

describe('Investment Module', () => {
    describe('calculateCompoundInterest', () => {
        it('should calculate compound interest correctly', () => {
            const result = calculateCompoundInterest(1000, 5, 10, 12);
            // 1000 * (1 + 0.05/12)^(12*10) = 1647.009...
            expect(result).to.be.closeTo(1647.01, 0.01);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateCompoundInterest(-1000, 5, 10, 12)).to.throw("Invalid input parameters");
            expect(() => calculateCompoundInterest(1000, -5, 10, 12)).to.throw("Invalid input parameters");
            expect(() => calculateCompoundInterest(1000, 5, -10, 12)).to.throw("Invalid input parameters");
            expect(() => calculateCompoundInterest(1000, 5, 10, 0)).to.throw("Invalid input parameters");
        });
    });

    describe('forecastPortfolioGrowth', () => {
        it('should forecast growth with contributions correctly', () => {
            const result = forecastPortfolioGrowth(10000, 500, 7, 10);
            // FV(initial) = 10000 * (1 + 0.07/12)^120 = 20096.61
            // FV(contributions) = 500 * ((1 + 0.07/12)^120 - 1) / (0.07/12) = 86542.40
            // Total = 106639.01
            expect(result).to.be.closeTo(106639.01, 0.1);
        });

        it('should handle zero annual rate', () => {
            const result = forecastPortfolioGrowth(10000, 500, 0, 10);
            // Initial: 10000
            // Contributions: 500 * 120 = 60000
            // Total: 70000
            expect(result).to.equal(70000);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => forecastPortfolioGrowth(-10000, 500, 7, 10)).to.throw("Invalid input parameters");
            expect(() => forecastPortfolioGrowth(10000, -500, 7, 10)).to.throw("Invalid input parameters");
            expect(() => forecastPortfolioGrowth(10000, 500, -7, 10)).to.throw("Invalid input parameters");
            expect(() => forecastPortfolioGrowth(10000, 500, 7, -10)).to.throw("Invalid input parameters");
        });
    });
});
