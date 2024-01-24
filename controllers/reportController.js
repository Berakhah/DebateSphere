const { Report, Debate } = require('../models'); // Adjust the path as necessary
const { validationResult } = require('express-validator');

const createReport = async (req, res) => {
    const { debateId, reason } = req.body;

    try {
        await Report.create({
            type: 'debate',
            targetId: debateId,
            reporterId: req.user.id, // Ensure your auth middleware sets req.user
            reason
        });
        return res.json({ message: 'Report submitted successfully.' });
    } catch (error) {
        console.error('Error submitting report:', error);
        return res.status(500).json({ message: 'Error submitting report.' });
    }
};

const validateDebateReport = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { debateId } = req.body;
    try {
        const debateExists = await Debate.findByPk(debateId);
        if (!debateExists) {
            return res.status(404).json({ message: 'Debate not found.' });
        }
        next();
    } catch (error) {
        console.error('Error validating debate report:', error);
        return res.status(500).json({ message: 'Error validating debate report.' });
    }
};

module.exports = {
    createReport,
    validateDebateReport
};
