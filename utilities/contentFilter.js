// utilities/contentFilter.js
const prohibitedKeywords = ['inappropriate', 'bannedword'];

const isContentAppropriate = (text) => {
    return !prohibitedKeywords.some(keyword => text.includes(keyword));
};

module.exports = { isContentAppropriate };
