const assert = require('assert');
const creditCard = require('../src/creditCard');

describe('Credit Card Module', () => {
    describe('calculatePayoffTime', () => {
        it('should calculate payoff time correctly', () => {
            const months = creditCard.calculatePayoffTime(1000, 18, 100);
            // Approx 11 months
            assert.strictEqual(months, 11);
        });

        it('should throw error if payment too low', () => {
            assert.throws(() => {
                creditCard.calculatePayoffTime(1000, 18, 10); // Interest is 15
            }, /Monthly payment is too low/);
        });

        it('should return 0 for zero or negative balance', () => {
            assert.strictEqual(creditCard.calculatePayoffTime(0, 18, 100), 0);
            assert.strictEqual(creditCard.calculatePayoffTime(-100, 18, 100), 0);
        });

        it('should throw error for invalid inputs', () => {
            assert.throws(() => creditCard.calculatePayoffTime(1000, -1, 100), /Invalid input parameters/);
            assert.throws(() => creditCard.calculatePayoffTime(1000, 18, 0), /Invalid input parameters/);
            assert.throws(() => creditCard.calculatePayoffTime(1000, 18, -10), /Invalid input parameters/);
        });

        it('should throw "Invalid input parameters" specifically for zero payment', () => {
             // This ensures that if the check `monthlyPayment <= 0` is mutated to `< 0`,
             // it won't fall through to "Monthly payment is too low"
             try {
                 creditCard.calculatePayoffTime(1000, 18, 0);
             } catch (e) {
                 assert.strictEqual(e.message, "Invalid input parameters");
                 return;
             }
             assert.fail("Should have thrown");
        });
    });

    describe('calculateInterestCharges', () => {
        it('should calculate interest charges', () => {
            const interest = creditCard.calculateInterestCharges(1000, 18, 12);
            // 1000 * (1.015)^12 - 1000 = 195.62
            assert.strictEqual(interest, 195.62);
        });
    });

    describe('calculateMinimumPayment', () => {
        it('should calculate minimum payment', () => {
            const min = creditCard.calculateMinimumPayment(2000, 2);
            // 40
            assert.strictEqual(min, 40.00);
        });

        it('should use floor if payment is low', () => {
            const min = creditCard.calculateMinimumPayment(500, 2);
            // 10 < 25 floor
            assert.strictEqual(min, 25.00);
        });
    });

    describe('compareCards', () => {
        it('should compare cards correctly', () => {
            const card1 = { name: 'A', annualFee: 0, rewardRate: 1 };
            const card2 = { name: 'B', annualFee: 95, rewardRate: 2 };
            
            const result = creditCard.compareCards(card1, card2, 20000);
            // Card A: 200 - 0 = 200
            // Card B: 400 - 95 = 305
            // Better: B
            
            assert.strictEqual(result.betterChoice, 'B');
            assert.strictEqual(result['A'], 200.00);
            assert.strictEqual(result['B'], 305.00);
        });
    });
});
