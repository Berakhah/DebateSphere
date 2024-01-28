// utilities/contentFilter.js
const prohibitedPatterns = [/inappropriate/i, /bannedword/i];

const isContentAppropriate = (text) => !prohibitedPatterns.some((pattern) => pattern.test(text));

module.exports = { isContentAppropriate };
