const { expect } = require('chai');
const { calculateNPV, calculateIRR, calculateStandardDeviation, calculateSharpeRatio } = require('../src/statistics');

describe('Statistics Module', () => {
    describe('calculateNPV', () => {
        it('should calculate NPV correctly', () => {
            // Rate 10%, Initial -1000, Year 1 500, Year 2 500, Year 3 500
            // NPV = -1000 + 500/1.1 + 500/1.21 + 500/1.331
            // NPV = -1000 + 454.54 + 413.22 + 375.66 = 243.42
            const npv = calculateNPV(10, [-1000, 500, 500, 500]);
            expect(npv).to.be.closeTo(243.43, 0.1);
        });

        it('should handle zero rate', () => {
            const npv = calculateNPV(0, [-1000, 500, 500]);
            expect(npv).to.equal(0);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateNPV('10', [])).to.throw("Invalid input parameters");
        });
    });

    describe('calculateIRR', () => {
        it('should calculate IRR correctly', () => {
            // -100, 110 -> 10%
            const irr = calculateIRR([-100, 110]);
            expect(irr).to.be.closeTo(10.0, 0.1);
        });

        it('should calculate IRR for multi-year flows', () => {
            // -1000, 300, 300, 300, 300 -> ~7.71%
            const irr = calculateIRR([-1000, 300, 300, 300, 300]);
            expect(irr).to.be.closeTo(7.71, 0.1);
        });

        it('should throw error if no solution found or invalid flows', () => {
            expect(() => calculateIRR([100, 100])).to.throw("Cash flows must contain at least one positive and one negative value");
        });

        it('should handle zero cash flows correctly', () => {
            // [100, 0] -> Positive and Zero. No negative. Should throw.
            expect(() => calculateIRR([100, 0])).to.throw("Cash flows must contain at least one positive and one negative value");
        });
    });

    describe('calculateStandardDeviation', () => {
        it('should calculate standard deviation correctly', () => {
            const returns = [10, 12, 23, 23, 16, 23, 21, 16];
            // Mean = 18
            // Variance = 192 / 7 = 27.428...
            // StdDev = 5.237...
            const stdDev = calculateStandardDeviation(returns);
            expect(stdDev).to.be.closeTo(5.237, 0.01);
        });
    });

    describe('calculateSharpeRatio', () => {
        it('should calculate Sharpe Ratio correctly', () => {
            // Mean 10%, Risk Free 2%, StdDev 4% -> (10-2)/4 = 2.0
            const returns = [6, 14]; // Mean 10, StdDev 5.65...
            // Let's use simple inputs
            // Mean 10, StdDev 4? 
            // Returns: [6, 14] -> Mean 10. Var: ((6-10)^2 + (14-10)^2)/1 = (16+16)/1 = 32. StdDev = 5.6568
            // Sharpe = (10 - 2) / 5.6568 = 1.4142
            const sharpe = calculateSharpeRatio([6, 14], 2);
            expect(sharpe).to.be.closeTo(1.4142, 0.001);
        });
    });
});
