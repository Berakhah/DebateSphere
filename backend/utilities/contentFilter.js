// utilities/contentFilter.js
const prohibitedPatterns = [
    /inappropriate/i, 
    /bannedword/i,
    // Add new patterns below
    /offensivePattern1/i,
    /offensivePattern2/i
];

const isContentAppropriate = (text) => !prohibitedPatterns.some((pattern) => pattern.test(text));

module.exports = { isContentAppropriate };
