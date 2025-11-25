const { expect } = require('chai');
const { calculate401kProjection, calculateRMD, assessRetirementReadiness } = require('../src/retirement.js');

describe('Retirement Module', () => {
    describe('calculate401kProjection', () => {
        it('should project 401k balance correctly', () => {
            // Balance 10000, Contrib 5000, Match 3% of 50000 (1500), Return 5%, 1 Year
            // Total Contrib = 6500
            // Growth = 10000*0.05 + 6500*0.025 = 500 + 162.5 = 662.5
            // End Balance = 10000 + 6500 + 662.5 = 17162.5
            const result = calculate401kProjection(10000, 5000, 3, 5, 1, 50000, 0);
            expect(result.finalBalance).to.be.closeTo(17162.50, 0.1);
            expect(result.breakdown).to.have.lengthOf(1);
        });

        it('should handle baseline case (0% return, 0% match, 0% growth)', () => {
            // 10000 start, 5000 contrib/yr, 10 years
            // End = 10000 + 5000*10 = 60000
            const result = calculate401kProjection(10000, 5000, 0, 0, 10, 50000, 0);
            expect(result.finalBalance).to.equal(60000);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculate401kProjection(-10000, 5000, 3, 5, 1, 50000, 0)).to.throw("Invalid input parameters");
            expect(() => calculate401kProjection(10000, -5000, 3, 5, 1, 50000, 0)).to.throw("Invalid input parameters");
            expect(() => calculate401kProjection(10000, 5000, 3, 5, -1, 50000, 0)).to.throw("Invalid input parameters");
            expect(() => calculate401kProjection(10000, 5000, 3, 5, 1, -50000, 0)).to.throw("Invalid input parameters");
        });
    });

    describe('calculateRMD', () => {
        it('should return 0 for age < 72', () => {
            expect(calculateRMD(70, 100000)).to.equal(0);
        });

        it('should calculate RMD for age 72', () => {
            // 100000 / 27.4 = 3649.635...
            expect(calculateRMD(72, 100000)).to.be.closeTo(3649.64, 0.1);
        });

        it('should handle age > 100 (cap at 6.0 divisor)', () => {
            // 60000 / 6.0 = 10000
            expect(calculateRMD(101, 60000)).to.equal(10000);
        });

        it('should throw error for invalid inputs', () => {
            expect(() => calculateRMD(72, -100000)).to.throw("Invalid account balance");
        });
    });

    describe('assessRetirementReadiness', () => {
        it('should return a probability and recommendation', () => {
            // High savings, low expenses -> should be safe
            const result = assessRetirementReadiness(1000000, 20000, 40000, 10, 20, 5, 10);
            expect(result).to.have.property('successProbability');
            expect(result).to.have.property('recommendation');
            expect(result.successProbability).to.be.greaterThan(0);
        });

        it('should handle critical cases', () => {
            // No savings, high expenses -> should fail
            const result = assessRetirementReadiness(0, 0, 50000, 5, 20, 5, 10);
            expect(result.recommendation).to.equal("Critical Action Needed");
        });

        it('should throw error for invalid inputs', () => {
            expect(() => assessRetirementReadiness(-100, 20000, 40000, 10, 20, 5, 10)).to.throw("Invalid input parameters");
            expect(() => assessRetirementReadiness(100000, -20000, 40000, 10, 20, 5, 10)).to.throw("Invalid input parameters");
            expect(() => assessRetirementReadiness(100000, 20000, -40000, 10, 20, 5, 10)).to.throw("Invalid input parameters");
            expect(() => assessRetirementReadiness(100000, 20000, 40000, -10, 20, 5, 10)).to.throw("Invalid input parameters");
            expect(() => assessRetirementReadiness(100000, 20000, 40000, 10, -20, 5, 10)).to.throw("Invalid input parameters");
        });
    });
});
