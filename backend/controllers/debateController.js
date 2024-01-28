// controllers/debateController.js

const { Debate, Comment } = require('../models/debate');
const { isFuture, parseISO } = require('date-fns');
const { isContentAppropriate } = require('../utilities/contentFilter');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const debateController = {
    createDebate: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!isContentAppropriate(req.body.description)) {
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }

        const { dateTime } = req.body;
        const parsedDateTime = parseISO(dateTime);
        if (!isFuture(parsedDateTime)) {
            return res.status(400).json({ message: "The debate must be scheduled for a future date and time." });
        }

        try {
            const debate = await Debate.create({
                ...req.body,
                CreatorUserID: req.user.id // Assuming 'req.user.id' is correctly populated from the JWT strategy
            });

            // Emit an event for the newly created debate
            req.app.get('io').emit('debateCreated', debate);

            res.status(201).json(debate);
        } catch (error) {
            res.status(500).json({ message: "Error creating debate.", error: error.message });
        }
    },
    // Update a debate
    updateDebate: async (req, res) => {
        try {
            const debate = await Debate.findByPk(req.params.id);
            if (!debate) {
                return res.status(404).send({ message: "Debate not found." });
            }
            const updatedDebate = await debate.update(req.body);

            // Emit an event for the updated debate
            req.app.get('io').to(req.params.id).emit('debateUpdated', updatedDebate);

            res.json(updatedDebate);
        } catch (error) {
            res.status(500).json({ message: "Error updating debate.", error: error.message });
        }
    },

    // Delete a debate
    deleteDebate: async (req, res) => {
        try {
            const debate = await Debate.findByPk(req.params.id);
            if (debate) {
                await debate.destroy();
                // Emit an event for the deleted debate
                req.app.get('io').to(req.params.id).emit('debateDeleted', { debateId: req.params.id });
                res.json({ message: "Debate successfully deleted." });
            } else {
                res.status(404).json({ message: "Debate not found." });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting debate.", error: error.message });
        }
    },

    // Search for debates
    searchDebates: async (req, res) => {
        const { keyword, status, startDate, endDate, category } = req.query;
        try {
            const conditions = {
                [Op.and]: [ // Combine all conditions
                    keyword ? {
                        [Op.or]: [
                            { title: { [Op.iLike]: `%${keyword}%` } },
                            { description: { [Op.iLike]: `%${keyword}%` } }
                        ]
                    } : {},
                    status ? { status } : {},
                    startDate && endDate ? {
                        dateTime: {
                            [Op.between]: [new Date(startDate), new Date(endDate)]
                        }
                    } : {},
                    category ? { topicCategory: category } : {}
                ]
            };

            const debates = await Debate.findAll({
                where: conditions,
                order: [['dateTime', 'DESC']] // Orders by dateTime in descending order
            });
            res.json(debates);
        } catch (error) {
            console.error('Search error:', error);
            res.status(500).send('Failed to perform search.');
        }
    },

    // Retrieve archived debates
    getArchivedDebates: async (req, res) => {
        try {
            const archivedDebates = await Debate.findAll({
                where: { status: 'Archived' },
                order: [['dateTime', 'DESC']] // Adjust ordering as necessary
            });
            res.json(archivedDebates);
        } catch (error) {
            console.error('Error retrieving archived debates:', error);
            res.status(500).send('Failed to retrieve archived debates.');
        }
    }
};

module.exports = debateController;
