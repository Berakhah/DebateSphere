//moderationController.js

const { Report } = require('../models');

const moderationController = {
    createReport: async (req, res) => {
        const { targetId, reason, type } = req.body;

        try {
            const report = await Report.create({
                targetId,
                reporterId: req.user.id,
                reason,
                type
            });
            res.status(201).json({ message: 'Report submitted successfully.', reportId: report.id });
        } catch (error) {
            res.status(500).json({ message: 'Error submitting report.', error: error.message });
        }
    },

    reviewReport: async (req, res) => {
        const { id } = req.params;

        try {
            const report = await Report.findByPk(id);
            if (!report) {
                return res.status(404).json({ message: 'Report not found.' });
            }

            // Here you would implement the logic to take action based on the report
            // For simplicity, we'll just mark it as reviewed
            report.reviewed = true;
            await report.save();

            res.json({ message: 'Report reviewed successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error reviewing report.', error: error.message });
        }
    },
};

module.exports = moderationController;
