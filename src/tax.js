/**
 * Calculates income tax based on progressive tax brackets.
 * @param {number} income - The total annual income.
 * @param {Array<Object>} brackets - Array of tax brackets sorted by min income.
 * @returns {number} The total tax amount.
 */
function calculateIncomeTax(income, brackets) {
  if (income < 0) {
    throw new Error("Income cannot be negative");
  }
  if (!brackets || brackets.length === 0) {
      throw new Error("Invalid tax brackets");
  }

  let tax = 0;
  let remainingIncome = income;
  let previousMax = 0;

  for (const bracket of brackets) {
    const range = bracket.max - previousMax;
    const taxableAmount = Math.min(remainingIncome, range);

    if (taxableAmount > 0) {
      tax += taxableAmount * bracket.rate;
      remainingIncome -= taxableAmount;
    }
    
    previousMax = bracket.max;

    if (remainingIncome <= 0) break;
  }
  
  // If there is still income left above the last bracket (assuming last bracket max is Infinity or effectively so, 
  // but if the loop finishes and there's remaining income, it means the brackets didn't cover it. 
  // However, usually the last bracket has max: Infinity. 
  // If the last bracket has a finite max, and there is remaining income, we should probably handle it or assume it's taxed at the last rate?
  // For this implementation, let's assume the last provided bracket covers everything above its min if max is not provided or Infinity.
  // But if the loop exits, it means we've exhausted the brackets. 
  // Let's stick to the logic: brackets should cover the range.
  
  return Number(tax.toFixed(2));
}

/**
 * Calculates the effective tax rate.
 * @param {number} income - The total annual income.
 * @param {number} tax - The total tax paid.
 * @returns {number} The effective tax rate as a percentage.
 */
function calculateEffectiveTaxRate(income, tax) {
    if (income === 0) return 0;
    return Number(((tax / income) * 100).toFixed(2));
}

/**
 * Calculates capital gains tax.
 * @param {number} costBasis - Original purchase price.
 * @param {number} sellPrice - Selling price.
 * @param {number} yearsHeld - Duration held in years.
 * @param {number} income - Annual income (determines rate).
 * @returns {Object} Tax details (gain, type, taxAmount).
 */
function calculateCapitalGains(costBasis, sellPrice, yearsHeld, income) {
    if (costBasis < 0 || sellPrice < 0 || yearsHeld < 0 || income < 0) {
        throw new Error("Invalid input parameters");
    }

    const gain = sellPrice - costBasis;
    const type = yearsHeld >= 1 ? 'Long-term' : 'Short-term';
    let taxRate = 0;

    if (gain <= 0) {
        return { gain: gain, type: type, taxAmount: 0 };
    }

    if (type === 'Short-term') {
        // Taxed as ordinary income. Simplified: use a flat rate based on income roughly?
        // Or just say "Ordinary Income Rate".
        // For this function, let's assume we return the *amount* based on a simplified bracket logic for short term (same as income tax).
        // But we don't have brackets here. Let's assume a flat 22% for simplicity or require brackets?
        // Let's use simplified logic: Short term = 22%, Long term = 15% (standard).
        // Refined: Long term 0% if income < 40k, 15% if < 440k, 20% if > 440k.
        taxRate = 0.22; // Simplified average
    } else {
        if (income < 40000) taxRate = 0.0;
        else if (income < 440000) taxRate = 0.15;
        else taxRate = 0.20;
    }

    const taxAmount = gain * taxRate;

    return {
        gain: Number(gain.toFixed(2)),
        type: type,
        taxRate: taxRate,
        taxAmount: Number(taxAmount.toFixed(2))
    };
}

/**
 * Estimates total tax liability including deductions.
 * @param {number} income - Gross income.
 * @param {string} filingStatus - 'single', 'married', 'head'.
 * @param {number} itemizedDeductions - Total itemized deductions (optional).
 * @returns {number} Estimated tax.
 */
function estimateTaxLiability(income, filingStatus, itemizedDeductions = 0) {
    if (income < 0 || itemizedDeductions < 0) throw new Error("Invalid input parameters");

    const standardDeductions = {
        'single': 12950,
        'married': 25900,
        'head': 19400
    };

    const deduction = Math.max(standardDeductions[filingStatus] || 0, itemizedDeductions);
    const taxableIncome = Math.max(0, income - deduction);

    // Use a default bracket set for estimation if not provided
    // 2022-ish brackets for Single
    const defaultBrackets = [
        { rate: 0.10, max: 10275 },
        { rate: 0.12, max: 41775 },
        { rate: 0.22, max: 89075 },
        { rate: 0.24, max: 170050 },
        { rate: 0.32, max: 215950 },
        { rate: 0.35, max: 539900 },
        { rate: 0.37, max: Infinity }
    ];

    // If married, brackets are roughly double. Simplified: just double the max.
    let brackets = defaultBrackets;
    if (filingStatus === 'married') {
        brackets = defaultBrackets.map(b => ({ rate: b.rate, max: b.max === Infinity ? Infinity : b.max * 2 }));
    }

    return calculateIncomeTax(taxableIncome, brackets);
}

module.exports = {
  calculateIncomeTax,
  calculateEffectiveTaxRate,
  calculateCapitalGains,
  estimateTaxLiability
};
