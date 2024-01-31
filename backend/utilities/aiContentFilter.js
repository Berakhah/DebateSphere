const Perspective = require('perspective-api-client');
const perspective = new Perspective({ apiKey: process.env.PERSPECTIVE_API_KEY });

const checkContentWithAI = async (text) => {
    try {
        const result = await perspective.analyze(text);
        // Adjust the threshold and attribute as per your requirement
        return result.attributeScores.TOXICITY.summaryScore.value < 0.7; 
    } catch (error) {
        console.error('Error checking content with AI:', error);
        return true; // Default to true to avoid blocking content in case of error
    }
};

module.exports = { checkContentWithAI };
