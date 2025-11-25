const fc = require('fast-check');
const assert = require('assert');
const investment = require('../src/investment');
const loan = require('../src/loan');
const statistics = require('../src/statistics');

describe('Fuzzing / Property-Based Tests', () => {
    
    describe('Investment Module', () => {
        it('calculateCompoundInterest should always return a positive number for positive inputs', () => {
            fc.assert(
                fc.property(
                    fc.float({ min: 0, max: 1000000 }), // Principal
                    fc.float({ min: 0, max: 100 }),     // Rate
                    fc.integer({ min: 0, max: 100 }),   // Years
                    fc.integer({ min: 1, max: 12 }),    // Frequency
                    (p, r, t, n) => {
                        const result = investment.calculateCompoundInterest(p, r, t, n);
                        return result >= p && !isNaN(result) && isFinite(result);
                    }
                )
            );
        });
    });

    describe('Loan Module', () => {
        it('calculateMonthlyPayment should be consistent with Amortization Schedule total', () => {
            fc.assert(
                fc.property(
                    fc.float({ min: 1000, max: 1000000 }), // Principal
                    fc.float({ min: 0.1, max: 20 }),       // Rate (avoid 0 for this specific check to ensure amortization)
                    fc.integer({ min: 1, max: 30 }),       // Years
                    (p, r, t) => {
                        try {
                            const monthlyPayment = loan.calculateMonthlyPayment(p, r, t);
                            const schedule = loan.calculateAmortizationSchedule(p, r, t);
                            
                            // Sum of principal payments should equal original principal (approx)
                            const totalPrincipalPaid = schedule.reduce((sum, row) => sum + row.principalPayment, 0);
                            
                            // Allow small floating point error
                            const diff = Math.abs(totalPrincipalPaid - p);
                            if (diff >= 1.0) {
                                console.error(`FAILURE: P=${p}, R=${r}, T=${t}, Diff=${diff}`);
                                return false;
                            }
                            return true;
                        } catch (e) {
                            console.error(`CRASH: P=${p}, R=${r}, T=${t}, Error=${e.message}`);
                            return false;
                        }
                    }
                )
            );
        });
    });

    describe.only('Statistics Module', () => {
        it('calculateStandardDeviation should be non-negative', () => {
            fc.assert(
                fc.property(
                    fc.array(fc.float({ min: -100, max: 100 }), { minLength: 2 }), // Returns
                    (returns) => {
                        const stdDev = statistics.calculateStandardDeviation(returns);
                        return stdDev >= 0 && !isNaN(stdDev);
                    }
                )
            );
        });

        it('calculateNPV should decrease as discount rate increases (for positive cash flows)', () => {
            fc.assert(
                fc.property(
                    fc.float({ min: 1, max: 10 }), // Rate 1
                    fc.float({ min: 11, max: 20 }), // Rate 2 (Higher)
                    fc.array(fc.float({ min: 1, max: 1000 }), { minLength: 1 }), // Positive cash flows
                    (r1, r2, flows) => {
                        const npv1 = statistics.calculateNPV(r1, flows);
                        const npv2 = statistics.calculateNPV(r2, flows);
                        if (npv1 < npv2) {
                             console.error(`NPV FAIL: r1=${r1}, r2=${r2}, flows=${JSON.stringify(flows)}`);
                             console.error(`npv1=${npv1}, npv2=${npv2}`);
                             return false;
                        }
                        return true;
                    }
                )
            );
        });
    });
});
