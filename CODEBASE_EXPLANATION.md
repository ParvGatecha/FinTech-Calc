# Codebase Explanation

This document provides a detailed explanation of each file in the FinTech Calc Engine project.

## Source Code (`src/`)

### 1. `budget.js`
**Purpose:** Handles personal finance budgeting and expense analysis.
*   **`calculateSavingsRate(income, expenses)`**: Computes the percentage of income saved.
*   **`analyzeExpenses(expenses)`**: Takes an array of expense objects and returns total expenses, a breakdown by category, and the highest expense category.
*   **`calculateEmergencyFund(monthlyExpenses, months)`**: Calculates the total amount needed for an emergency fund based on monthly expenses and desired coverage duration.
*   **`calculateDebtToIncomeRatio(monthlyDebtPayments, grossMonthlyIncome)`**: Computes the Debt-to-Income (DTI) ratio, a key metric for loan approval.
*   **`forecastBudget(currentBudget, inflationRate, years)`**: Projects future budget requirements accounting for inflation.

### 2. `creditCard.js`
**Purpose:** Provides tools for managing credit card debt and comparing cards.
*   **`calculatePayoffTime(balance, interestRate, monthlyPayment)`**: Calculates how many months it will take to pay off a balance given a fixed monthly payment.
*   **`calculateInterestCharges(balance, interestRate, months)`**: Estimates the total interest that will accumulate over a specific period.
*   **`calculateMinimumPayment(balance, minPaymentRate)`**: Calculates the minimum monthly payment based on a percentage of the balance, with a floor (e.g., $25).
*   **`compareCards(card1, card2, annualSpend)`**: Compares two credit cards based on their annual fees and reward rates to determine which offers better value for a given spending level.

### 3. `crypto.js`
**Purpose:** Analyzes cryptocurrency investments and DeFi metrics.
*   **`calculateCryptoROI(invested, currentValue)`**: Calculates the Return on Investment percentage.
*   **`calculateStakingRewards(amount, apy, years)`**: Estimates rewards earned from staking tokens over time.
*   **`calculateImpermanentLoss(priceChangeRatio)`**: Calculates the potential loss of funds in a liquidity pool due to price divergence compared to holding.
*   **`calculateDollarCostAverage(purchases)`**: Computes the average purchase price and total holdings from a series of buy transactions.

### 4. `currency.js`
**Purpose:** Handles currency conversion.
*   **`convertCurrency(amount, fromCurrency, toCurrency, rates)`**: Converts an amount between two currencies using provided exchange rates.
*   **`getHistoricalRate(date, baseCurrency)`**: A mock function simulating the retrieval of historical exchange rates (returns a promise).

### 5. `investment.js`
**Purpose:** Core investment calculations and projections.
*   **`calculateCompoundInterest(principal, annualRate, timeYears, frequency)`**: Standard compound interest formula.
*   **`forecastPortfolioGrowth(initialInvestment, monthlyContribution, annualRate, years)`**: Projects portfolio value with regular monthly contributions.
*   **`runMonteCarloSimulation(...)`**: Performs thousands of simulations using random volatility to estimate a range of possible portfolio outcomes (min, max, median, percentiles).
*   **`calculateAssetAllocation(...)`**: Determines the buy/sell actions needed to rebalance a portfolio to its target allocation.
*   **`calculateInflationImpact(futureValue, inflationRate, years)`**: Adjusts a future monetary value back to present purchasing power.
*   **`calculateCAGR(beginningValue, endingValue, years)`**: Calculates the Compound Annual Growth Rate.
*   **`calculateRuleOf72(interestRate)`**: Estimates the years required to double an investment.

### 6. `loan.js`
**Purpose:** Loan amortization and analysis.
*   **`calculateMonthlyPayment(...)`**: Standard amortization formula for fixed-rate loans.
*   **`calculateAmortizationSchedule(...)`**: Generates a month-by-month schedule showing principal, interest, and remaining balance.
*   **`calculateRefinanceImpact(...)`**: Compares a current loan with a potential new loan to determine savings and break-even time.
*   **`calculateExtraPaymentSchedule(...)`**: Shows how the loan term and total interest change when extra payments are made.
*   **`calculateBalloonPayment(...)`**: Calculates payments for loans with a large final "balloon" payment.
*   **`calculateLoanAffordability(...)`**: Reverse-calculates the maximum loan amount possible for a given monthly payment budget.

### 7. `realEstate.js`
**Purpose:** Real estate investment and mortgage analysis.
*   **`calculateMortgageMax(...)`**: Determines the maximum mortgage a user qualifies for based on DTI ratios (28/36 rule).
*   **`calculateRentalYield(...)`**: Computes Gross and Net Rental Yield percentages.
*   **`calculateCapRate(...)`**: Calculates the Capitalization Rate (NOI / Property Value).
*   **`calculateCashOnCashReturn(...)`**: Measures the return on actual cash invested (excluding debt).
*   **`calculateAppreciation(...)`**: Projects future property value based on an annual growth rate.
*   **`calculateClosingCosts(...)`**: Estimates closing costs based on property value and location.

### 8. `retirement.js`
**Purpose:** Retirement planning specific calculations.
*   **`calculate401kProjection(...)`**: Projects 401(k) growth including employer matching and salary growth.
*   **`calculateRMD(age, accountBalance)`**: Calculates Required Minimum Distributions based on IRS life expectancy tables.
*   **`assessRetirementReadiness(...)`**: Uses Monte Carlo simulation to estimate the probability of savings lasting through retirement.

### 9. `statistics.js`
**Purpose:** Financial statistics and risk metrics.
*   **`calculateNPV(rate, cashFlows)`**: Net Present Value of a cash flow series.
*   **`calculateIRR(cashFlows)`**: Internal Rate of Return (the rate that makes NPV zero).
*   **`calculateStandardDeviation(returns)`**: Measures volatility of returns.
*   **`calculateSharpeRatio(...)`**: Measures risk-adjusted return.
*   **`calculateBeta(...)`**: Measures an asset's volatility relative to the market.
*   **`calculateTreynorRatio(...)`**: Measures returns earned in excess of the risk-free rate per unit of market risk.

### 10. `tax.js`
**Purpose:** Tax estimation and calculations.
*   **`calculateIncomeTax(income, brackets)`**: Calculates tax based on progressive brackets.
*   **`calculateEffectiveTaxRate(...)`**: The average rate paid on total income.
*   **`calculateCapitalGains(...)`**: Determines tax on investment gains (short-term vs. long-term).
*   **`estimateTaxLiability(...)`**: Estimates total tax based on filing status and standard/itemized deductions.

## Test Files (`test/`)

*   **`budget.test.js`**: Unit tests for `budget.js`. Verifies savings rate, expense analysis logic, and DTI calculations.
*   **`creditCard.test.js`**: Unit tests for `creditCard.js`. Checks payoff formulas and card comparison logic.
*   **`crypto.test.js`**: Unit tests for `crypto.js`. Verifies ROI, staking, and impermanent loss formulas.
*   **`currency.test.js`**: Unit tests for `currency.js`. Checks conversion math and error handling.
*   **`integration.test.js`**: **Integration Tests**. Contains scenarios that combine multiple modules (e.g., Net Worth calculation using Real Estate, Investment, and Loan modules) to ensure they work together correctly.
*   **`investment.test.js`**: Unit tests for `investment.js`. Validates compound interest, Monte Carlo simulation bounds, and rebalancing logic.
*   **`loan.test.js`**: Unit tests for `loan.js`. Verifies amortization schedules, refinance math, and affordability calculations.
*   **`realEstate.test.js`**: Unit tests for `realEstate.js`. Checks mortgage limits, yield calculations, and appreciation.
*   **`retirement.test.js`**: Unit tests for `retirement.js`. Validates 401(k) projections and RMD rules.
*   **`statistics.test.js`**: Unit tests for `statistics.js`. Verifies complex statistical formulas like NPV, IRR, and Beta.
*   **`tax.test.js`**: Unit tests for `tax.js`. Checks bracket logic, capital gains rules, and deduction handling.

## Other Files

*   **`package.json`**: Defines project metadata, dependencies (Mocha, Stryker), and scripts (`npm test`).
*   **`stryker.conf.json`**: Configuration for Stryker Mutation Testing.
*   **`verify_expansion.js`**: A utility script created to count the total lines of code in `src/` and perform a quick sanity check of the modules.
*   **`PROJECT_REPORT.md`**: High-level summary of the project status and features.
