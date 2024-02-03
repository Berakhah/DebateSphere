//reportController.js

const { Report, Debate } = require('../models'); // Adjust the path as necessary
const { validationResult } = require('express-validator');

const createReport = async (req, res) => {
    const { debateId, reason, issueType } = req.body;

    try {
        await Report.create({
            type: 'debate',
            targetId: debateId,
            reporterId: req.user.id,
            reason,
            issueType // Include issueType here
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

const fetchAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll();
        return res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        return res.status(500).json({ message: 'Error fetching reports.' });
    }
};

module.exports = {
    createReport,
    validateDebateReport,
    fetchAllReports
};
