const fs = require('fs');
const path = require('path');

// Modules to verify
const modules = [
    'currency.js',
    'investment.js',
    'loan.js',
    'retirement.js',
    'statistics.js',
    'tax.js',
    'realEstate.js',
    'budget.js',
    'creditCard.js',
    'crypto.js'
];

const srcDir = path.join(__dirname, 'src');

let totalLines = 0;

console.log('--- Line Count Verification ---');

modules.forEach(file => {
    const filePath = path.join(srcDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n').length;
        console.log(`${file}: ${lines} lines`);
        totalLines += lines;
    } else {
        console.error(`MISSING: ${file}`);
    }
});

console.log('-------------------------------');
console.log(`Total Lines in src/: ${totalLines}`);

if (totalLines >= 1000) {
    console.log('SUCCESS: Target of 1000 lines reached!');
} else {
    console.log(`WARNING: ${1000 - totalLines} lines short of target.`);
}

console.log('\n--- Integration Check ---');
try {
    const realEstate = require('./src/realEstate');
    const budget = require('./src/budget');
    
    const mortgage = realEstate.calculateMortgageMax(100000, 500, 4, 30);
    console.log(`Max Mortgage (Income 100k, Debt 500): $${mortgage.maxMortgage}`);
    
    const savingsRate = budget.calculateSavingsRate(5000, 3000);
    console.log(`Savings Rate (Inc 5000, Exp 3000): ${savingsRate}%`);
    
    console.log('Integration Check Passed: Modules loaded and functions executed.');
} catch (error) {
    console.error('Integration Check Failed:', error.message);
}
