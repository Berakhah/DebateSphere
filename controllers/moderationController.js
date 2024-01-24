// controllers/moderationController.js
const { body, validationResult } = require('express-validator');
const { Report, Debate } = require('../model'); // Adjust paths as needed

const createReport = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { targetId, reason, type } = req.body; // type could be 'Debate', 'Comment', etc.

    try {
        const report = await Report.create({
            targetId,
            reporterId: req.user.id, // Assuming req.user is set by the auth middleware
            type,
            reason,
            reviewed: false // Default value
        });

        return res.status(201).json({ message: 'Report submitted successfully.', reportId: report.id });
    } catch (error) {
        console.error('Error submitting report:', error);
        return res.status(500).json({ message: 'Error submitting report.' });
    }
};

const reviewReport = async (req, res) => { // isModerator middleware checks if the user is a moderator
    const { id } = req.params;
    try {
        const report = await Report.findByPk(id);

        if (!report) {
            return res.status(404).json({ message: 'Report not found.' });
        }

        // Optionally, add logic to handle the report (e.g., delete a comment or debate)

        report.reviewed = true;
        await report.save();

        return res.json({ message: 'Report reviewed successfully.' });
    } catch (error) {
        console.error('Error reviewing report:', error);
        return res.status(500).json({ message: 'Error reviewing report.' });
    }
};

module.exports = {
    createReport,
    reviewReport
};
