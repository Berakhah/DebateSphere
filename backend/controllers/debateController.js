const { isFuture, parseISO } = require('date-fns');
const { isContentAppropriate } = require('../utilities/contentFilter');
const { checkContentWithAI } = require('../utilities/aiContentFilter');
const { validationResult } = require('express-validator');
const { Sequelize, Op } = require('sequelize');
const db = require('../models');
const moment = require('moment');
const { isValid } = require('date-fns'); 



const buildSearchQuery = ({ keyword, status, startDate, endDate, category }) => {
    const conditions = [];
    
    if (keyword) {
        const lowerKeyword = '%' + keyword.toLowerCase() + '%';
        conditions.push({
            [Op.or]: [
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), Sequelize.Op.like, lowerKeyword),
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), Sequelize.Op.like, lowerKeyword)
            ]
        });
    }
    
    if (status) conditions.push({ status });
    if (startDate && endDate) conditions.push({ dateTime: { [Op.between]: [new Date(startDate), new Date(endDate)] } });
    if (category) conditions.push({ topicCategory: category });
    
    return conditions;
};

const debateController = {
    async createDebate(req, res) {
        console.log('Creating debate with data:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!isContentAppropriate(req.body.description)) {
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }
        
        const isDescriptionAppropriate = await checkContentWithAI(req.body.description);
        if (!isDescriptionAppropriate) {
            return res.status(400).json({ message: "Content flagged as inappropriate by AI filter." });
        }

        const { dateTime } = req.body;
        const parsedDateTime = parseISO(dateTime);
        
        // if (!isFuture(parsedDateTime)) {
        //     return res.status(400).json({ message: "The debate must be scheduled for a future date and time." });
        // }

        if (!isValid(parsedDateTime) || !isFuture(parsedDateTime)) {
             return res.status(400).json({ message: "The debate must be scheduled for a future date and time with a valid format." });
        }

        try {
            const debate = await db.Debate.create({
                ...req.body,
                creatorUserId: req.user.id
            });
            req.app.get('io').emit('debateCreated', debate);
            res.status(201).json(debate);
        } catch (error) {
            console.error("Error creating debate:", error);
            res.status(500).json({ message: "Error creating debate.", error: error.message });
        }
    },

    async updateDebate(req, res) {
        const debateId = req.params.debateId;
        console.log("Updating debate with ID:", debateId);

        try {
            const debate = await db.Debate.findByPk(debateId);
            if (!debate) {
                return res.status(404).json({ message: "Debate not found." });
            }

            if (!isContentAppropriate(req.body.description) || !(await checkContentWithAI(req.body.description))) {
                return res.status(400).json({ message: "Content flagged as inappropriate." });
            }

            const updatedDebate = await debate.update(req.body);
            req.app.get('io').to(debateId).emit('debateUpdated', updatedDebate);
            res.json(updatedDebate);
        } catch (error) {
            console.error("Error updating debate:", error);
            res.status(500).json({ message: "Error updating debate.", error: error.message });
        }
    },
    
    async deleteDebate(req, res) {
        const debateId = req.params.debateId;
        console.log("Deleting debate with ID:", debateId);
    
        try {
            const debate = await db.Debate.findByPk(debateId);
            if (!debate) {
                return res.status(404).json({ message: "Debate not found." });
            }
    
            await debate.destroy();
            req.app.get('io').to(debateId).emit('debateDeleted', { debateId });
            res.json({ message: "Debate successfully deleted." });
        } catch (error) {
            console.error("Error deleting debate:", error);
            res.status(500).json({ message: "Error deleting debate.", error: error.message });
        }
    },
    
    async searchDebates(req, res) {
        const query = buildSearchQuery(req.query);
        try {
            const debates = await db.Debate.findAll({
                where: { [Op.and]: query },
                order: [['dateTime', 'DESC']]
            });
            res.json(debates);
        } catch (error) {
            console.error("Search error:", error);
            res.status(500).send('Failed to perform search.');
        }
    },
    
    async getArchivedDebates(req, res) {
        const { page = 1, limit = 10 } = req.query;
        try {
            const offset = (page - 1) * limit;
            const archivedDebates = await db.Debate.findAndCountAll({
                where: { status: 'Archived' },
                limit,
                offset,
                order: [['dateTime', 'DESC']]
            });
    
            res.json({
                totalPages: Math.ceil(archivedDebates.count / limit),
                currentPage: page,
                debates: archivedDebates.rows
            });
        } catch (error) {
            console.error("Error retrieving archived debates:", error);
            res.status(500).send('Failed to retrieve archived debates.');
        }
    }
};

module.exports = debateController;
