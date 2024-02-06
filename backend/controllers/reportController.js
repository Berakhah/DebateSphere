const { Report, Debate, Comment, Argument } = require('../models');
const { validationResult } = require('express-validator');

class ReportController {
    async createReport(req, res) {
        const { type, targetId, reason, issueType } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let target;
            switch (type) {
                case 'Debate':
                    target = await Debate.findByPk(targetId);
                    break;
                case 'Comment':
                    target = await Comment.findByPk(targetId);
                    break;
                case 'Argument':
                    target = await Argument.findByPk(targetId);
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid report type specified.' });
            }

            if (!target) {
                return res.status(404).json({ message: `${type} not found.` });
            }

            await Report.create({
                type,
                targetId,
                reporterId: req.user.id, 
                reason,
                issueType,
                reviewed: false 
            });

            return res.status(201).json({ message: 'Report submitted successfully.' });
        } catch (error) {
            console.error('Error submitting report:', error);
            return res.status(500).json({ message: 'Error submitting report.', error: error.message });
        }
    }

    async fetchAllReports(req, res) {
        try {
            const reports = await Report.findAll();
            return res.json(reports);
        } catch (error) {
            console.error('Error fetching reports:', error);
            return res.status(500).json({ message: 'Error fetching reports.', error: error.message });
        }
    }
}

const reportController = new ReportController();
module.exports = reportController;
