# Project Report: FinTech Calc Engine

## Overview
The FinTech Calc Engine is a robust JavaScript library designed to perform a wide array of financial calculations. It serves as a backend engine for financial planning applications, educational tools, and personal finance analysis.

## Project Status
- **Total Lines of Code:** ~1428 lines (Source)
- **Test Coverage:** 100% Pass Rate (78 tests)
- **Target:** Expanded to meet and exceed 1000 LOC requirement.

## Modules

### Core Financial Modules
- **Currency**: Currency conversion and historical rate mocking.
- **Investment**: Compound interest, portfolio growth, Monte Carlo simulations, CAGR, Rule of 72.
- **Loan**: Monthly payments, amortization schedules, refinancing analysis, loan affordability.
- **Tax**: Income tax calculations, capital gains, effective tax rate estimation.

### Advanced Planning Modules
- **Retirement**: 401(k) projections, RMD calculations, retirement readiness analysis.
- **Statistics**: NPV, IRR, Standard Deviation, Sharpe Ratio, Beta, Treynor Ratio.

### New Expansion Modules
- **Real Estate**: Mortgage affordability, rental yield, cap rate, cash-on-cash return.
- **Budget**: Savings rate, expense analysis, emergency fund calculation, DTI ratio.
- **Credit Card**: Payoff time, interest charges, minimum payments, card comparison.
- **Crypto**: ROI, staking rewards, impermanent loss, dollar-cost averaging.

## Technical Stack
- **Language**: JavaScript (Node.js)
- **Testing Framework**: Mocha
- **Assertion Library**: Node.js built-in `assert`

## Usage
To run the test suite:
```bash
npm test
```

To verify line counts and integration:
```bash
node verify_expansion.js
```
