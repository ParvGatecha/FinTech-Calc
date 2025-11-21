const { expect } = require('chai');
const { calculateCompoundInterest, forecastPortfolioGrowth, runMonteCarloSimulation, calculateAssetAllocation, calculateInflationImpact } = require('../src/investment');

describe('Investment Module', () => {
    describe('calculateCompoundInterest', () => {
        it('should calculate compound interest correctly', () => {
            const result = calculateCompoundInterest(1000, 5, 10, 12);
            // 1000 * (1 + 0.05/12)^(12*10) = 1647.009...
            expect(result).to.be.closeTo(1647.01, 0.01);
        });

        it('should handle zero principal', () => {
            const result = calculateCompoundInterest(0, 5, 10, 12);
            expect(result).to.equal(0);
        });

        it('should handle zero time', () => {
            const result = calculateCompoundInterest(1000, 5, 0, 12);
            expect(result).to.equal(1000);
        });

        it('should handle zero annual rate', () => {
            const result = calculateCompoundInterest(1000, 0, 10, 12);
            expect(result).to.equal(1000);
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

        it('should handle zero initial investment', () => {
            const result = forecastPortfolioGrowth(0, 500, 5, 10);
            // FV = 500 * ((1 + 0.05/12)^120 - 1) / (0.05/12)
            expect(result).to.be.closeTo(77641.14, 0.1);
        });

        it('should handle zero monthly contribution', () => {
            const result = forecastPortfolioGrowth(10000, 0, 5, 10);
            // FV = 10000 * (1 + 0.05/12)^120
            expect(result).to.be.closeTo(16470.09, 0.1);
        });

        it('should handle zero years', () => {
            const result = forecastPortfolioGrowth(10000, 500, 5, 0);
            expect(result).to.equal(10000);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => forecastPortfolioGrowth(-10000, 500, 7, 10)).to.throw("Invalid input parameters");
            expect(() => forecastPortfolioGrowth(10000, -500, 7, 10)).to.throw("Invalid input parameters");
            expect(() => forecastPortfolioGrowth(10000, 500, -7, 10)).to.throw("Invalid input parameters");
            expect(() => forecastPortfolioGrowth(10000, 500, 7, -10)).to.throw("Invalid input parameters");
        });
    });

    describe('runMonteCarloSimulation', () => {
        it('should return simulation statistics', () => {
            const result = runMonteCarloSimulation(10000, 500, 10, 7, 10);
            expect(result).to.have.property('median');
            expect(result).to.have.property('p10');
            expect(result).to.have.property('p90');
            expect(result.median).to.be.greaterThan(10000);
        });

        it('should throw error for invalid simulations', () => {
            expect(() => runMonteCarloSimulation(10000, 500, 10, 7, 10, 0)).to.throw("Invalid input parameters");
        });
    });

    describe('calculateAssetAllocation', () => {
        it('should calculate rebalancing actions', () => {
            const total = 100000;
            const current = [{ name: 'Stocks', value: 60000 }, { name: 'Bonds', value: 40000 }];
            const target = [{ name: 'Stocks', percent: 70 }, { name: 'Bonds', percent: 30 }];
            
            const actions = calculateAssetAllocation(total, current, target);
            
            // Stocks: Target 70k, Current 60k -> Buy 10k
            // Bonds: Target 30k, Current 40k -> Sell 10k
            const stocks = actions.find(a => a.name === 'Stocks');
            const bonds = actions.find(a => a.name === 'Bonds');
            
            expect(stocks.action).to.equal('BUY');
            expect(stocks.difference).to.equal(10000);
            expect(bonds.action).to.equal('SELL');
            expect(bonds.difference).to.equal(-10000);
        });
    });

    describe('calculateInflationImpact', () => {
        it('should calculate real value correctly', () => {
            // 100k in 10 years with 3% inflation
            // 100000 / (1.03)^10 = 100000 / 1.3439 = 74409...
            const realValue = calculateInflationImpact(100000, 3, 10);
            expect(realValue).to.be.closeTo(74409.39, 0.1);
        });
    });
});
