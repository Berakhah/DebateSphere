// controllers/debateController.js

const { isFuture, parseISO } = require('date-fns');
const { isContentAppropriate } = require('../utilities/contentFilter');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../models'); // Importing the database models

const debateController = {
    createDebate: async (req, res) => {
        console.log('Creating debate with data:', req.body);
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
            console.log('Attempting to create debate...');
            const debate = await db.Debate.create({
                ...req.body,
                creatorUserId: req.user.id // Assuming 'req.user.id' is correctly populated from the JWT strategy
            });
            console.log('Debate created:', debate);

            // Emit an event for the newly created debate
            req.app.get('io').emit('debateCreated', debate);

            res.status(201).json(debate);
        } catch (error) {
            res.status(500).json({ message: "Error creating debate.", error: error.message });
        }
    },

    updateDebate: async (req, res) => {
        const debateId = req.params.debateId;
        console.log("Updating debate with ID:", debateId);
    
        try {
            const debate = await db.Debate.findByPk(debateId);
            if (!debate) {
                return res.status(404).send({ message: "Debate not found." });
            }
    
            const updatedDebate = await debate.update(req.body);
    
            // Emit an event for the updated debate
            req.app.get('io').to(debateId).emit('debateUpdated', updatedDebate);
    
            res.json(updatedDebate);
        } catch (error) {
            res.status(500).json({ message: "Error updating debate.", error: error.message });
        }
    },
    
    deleteDebate: async (req, res) => {
        const debateId = req.params.debateId;
        console.log("Deleting debate with ID:", debateId);
    
        try {
            const debate = await db.Debate.findByPk(debateId);
            if (!debate) {
                return res.status(404).send({ message: "Debate not found." });
            }
    
            await debate.destroy();
    
            // Emit an event for the deleted debate
            req.app.get('io').to(debateId).emit('debateDeleted', { debateId });
    
            res.json({ message: "Debate successfully deleted." });
        } catch (error) {
            res.status(500).json({ message: "Error deleting debate.", error: error.message });
        }
    },
    
    // searchDebates: async (req, res) => {
    //     const { keyword, status, startDate, endDate, category } = req.query;
    //     try {
    //         const conditions = {
    //             [Op.and]: [
    //                 keyword ? {
    //                     [Op.or]: [
    //                         { title: { [Op.iLike]: `%${keyword}%` } },
    //                         { description: { [Op.iLike]: `%${keyword}%` } }
    //                     ]
    //                 } : {},
    //                 status ? { status } : {},
    //                 startDate && endDate ? {
    //                     dateTime: {
    //                         [Op.between]: [new Date(startDate), new Date(endDate)]
    //                     }
    //                 } : {},
    //                 category ? { topicCategory: category } : {}
    //             ]
    //         };

    //         const debates = await db.Debate.findAll({
    //             where: conditions,
    //             order: [['dateTime', 'DESC']]
    //         });

    //         res.json(debates);
    //     } catch (error) {
    //         console.error('Search error:', error);
    //         res.status(500).send('Failed to perform search.');
    //     }
    // },

    searchDebates: async (req, res) => {
        const { keyword, status, startDate, endDate, category } = req.query;
        try {
            const conditions = {
                [Op.and]: [
                    // Use Sequelize.fn for case-insensitive search
                    keyword ? {
                        [Op.or]: [
                            Sequelize.where(
                                Sequelize.fn('LOWER', Sequelize.col('title')),
                                Sequelize.Op.like,
                                '%' + keyword.toLowerCase() + '%'
                            ),
                            Sequelize.where(
                                Sequelize.fn('LOWER', Sequelize.col('description')),
                                Sequelize.Op.like,
                                '%' + keyword.toLowerCase() + '%'
                            )
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
    
            const debates = await db.Debate.findAll({
                where: conditions,
                order: [['dateTime', 'DESC']]
            });
    
            res.json(debates);
        } catch (error) {
            console.error('Search error:', error);
            res.status(500).send('Failed to perform search.');
        }
    },
    
    getArchivedDebates: async (req, res) => {
        try {
            const archivedDebates = await db.Debate.findAll({
                where: { status: 'Archived' },
                order: [['dateTime', 'DESC']]
            });

            res.json(archivedDebates);
        } catch (error) {
            console.error('Error retrieving archived debates:', error);
            res.status(500).send('Failed to retrieve archived debates.');
        }
    }
};

module.exports = debateController;
