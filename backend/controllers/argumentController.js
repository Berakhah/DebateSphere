const { Argument, User } = require('../models');
const { validationResult } = require('express-validator');
const { isContentAppropriate } = require('../utilities/contentFilter');

const argumentController = {
    async postArgument(req, res) {
        console.log('Received request to post an argument:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        const { debateId } = req.params;
        const userId = req.user.id;

        if (!isContentAppropriate(content)) {
            console.warn('Content includes prohibited keywords:', content);
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }

        try {
            const newArgument = await Argument.create({
                debateId,
                authorUserId: userId,
                content
            });

            console.log('Argument posted successfully:', newArgument);
            return res.status(201).json(newArgument);
        } catch (error) {
            console.error('Error posting argument:', error);
            return res.status(500).json({ message: 'Error posting argument.', error: error.message });
        }
    },

    async listArgumentsForDebate(req, res) {
        const { debateId } = req.params;
        console.log('Received request to list arguments for debate:', debateId);
        try {
            const argumentsList = await Argument.findAll({
                where: { debateId },
                include: [{
                    model: User,
                    as: 'author',
                    attributes: ['name']
                }]
            });
            console.log('Arguments fetched successfully for debate:', debateId);
            res.status(200).json(argumentsList);
        } catch (error) {
            console.error('Error listing arguments for debate:', error);
            return res.status(500).json({ message: 'Error listing arguments for debate.', error: error.message });
        }
    }
};

module.exports = argumentController;
