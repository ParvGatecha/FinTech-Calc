// @ts-nocheck
const { expect } = require('chai');
const { convertCurrency, getHistoricalRate } = require('../src/currency');

describe('Currency Module', () => {
    const rates = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.75
    };

    describe('convertCurrency', () => {
        it('should convert currency correctly', () => {
            const result = convertCurrency(100, 'EUR', 'GBP', rates);
            // 100 / 0.85 = 117.647...
            // 117.647... * 0.75 = 88.235...
            expect(result).to.be.closeTo(88.24, 0.01);
        });

        it('should throw error for invalid currency', () => {
            expect(() => convertCurrency(100, 'XYZ', 'USD', rates)).to.throw("Invalid currency code");
        });

        it('should throw error for negative amount', () => {
            expect(() => convertCurrency(-100, 'EUR', 'GBP', rates)).to.throw("Amount cannot be negative");
        });

        it('should handle zero amount', () => {
            const result = convertCurrency(0, 'EUR', 'GBP', rates);
            expect(result).to.equal(0);
        });
    });

    describe('getHistoricalRate', () => {
        it('should return mock rates', async () => {
            const result = await getHistoricalRate('2023-01-01', 'USD');
            expect(result).to.have.property('EUR');
        });
    });
});
