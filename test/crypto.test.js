const assert = require('assert');
const crypto = require('../src/crypto');

describe('Crypto Module', () => {
    describe('calculateCryptoROI', () => {
        it('should calculate ROI', () => {
            const roi = crypto.calculateCryptoROI(1000, 1500);
            // 50%
            assert.strictEqual(roi, 50.00);
        });

        it('should throw error for zero invested amount', () => {
             assert.throws(() => crypto.calculateCryptoROI(0, 1500), /Invested amount must be positive/);
        });

        it('should throw error for invalid inputs', () => {
            assert.throws(() => crypto.calculateCryptoROI(0, 1500), /Invested amount must be positive/);
            assert.throws(() => crypto.calculateCryptoROI(-100, 1500), /Invested amount must be positive/);
        });
    });

    describe('calculateStakingRewards', () => {
        it('should calculate staking rewards', () => {
            const result = crypto.calculateStakingRewards(100, 10, 1);
            // 100 * 1.1 = 110
            assert.strictEqual(result.finalBalance, 110.0000);
            assert.strictEqual(result.rewards, 10.0000);
        });

        it('should throw error for invalid inputs', () => {
            assert.throws(() => crypto.calculateStakingRewards(-100, 10, 1), /Invalid input parameters/);
            assert.throws(() => crypto.calculateStakingRewards(100, -10, 1), /Invalid input parameters/);
            assert.throws(() => crypto.calculateStakingRewards(100, 10, -1), /Invalid input parameters/);
        });
    });

    describe('calculateImpermanentLoss', () => {
        it('should calculate impermanent loss', () => {
            // Price doubles (ratio 2)
            // Loss = 2 * sqrt(2) / 3 - 1 = 2 * 1.414 / 3 - 1 = 0.9428 - 1 = -0.0572 = -5.72%
            const loss = crypto.calculateImpermanentLoss(2);
            assert.strictEqual(loss, -5.72);
        });

        it('should throw error for invalid inputs', () => {
            assert.throws(() => crypto.calculateImpermanentLoss(0), /Price change ratio must be positive/);
            assert.throws(() => crypto.calculateImpermanentLoss(-1), /Price change ratio must be positive/);
        });
    });

    describe('calculateDollarCostAverage', () => {
        it('should calculate DCA', () => {
            const purchases = [
                { amount: 1000, price: 100 }, // 10 coins
                { amount: 1000, price: 50 }   // 20 coins
            ];
            // Total cost = 2000
            // Total coins = 30
            // Avg price = 66.67
            
            const result = crypto.calculateDollarCostAverage(purchases);
            assert.strictEqual(result.averagePrice, 66.67);
            assert.strictEqual(result.totalCoins, 30.000000);
        });

        it('should throw error for invalid inputs', () => {
            assert.throws(() => crypto.calculateDollarCostAverage(null), /Invalid purchases array/);
            assert.throws(() => crypto.calculateDollarCostAverage([]), /Invalid purchases array/);
        });
    });
});
