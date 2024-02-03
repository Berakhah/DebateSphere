const { Argument, User } = require('../models');
const { validationResult } = require('express-validator');
const { isContentAppropriate } = require('../utilities/contentFilter');

const argumentController = {
    async postArgument(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        const { debateId } = req.params;
        const userId = req.user.id;

        if (!isContentAppropriate(content)) {
            return res.status(400).json({ message: "Content includes prohibited keywords." });
        }

        try {
            const newArgument = await Argument.create({
                debateId,
                authorUserId: userId,
                content
            });

            return res.status(201).json(newArgument);
        } catch (error) {
            console.error('Error posting argument:', error);
            return res.status(500).json({ message: 'Error posting argument.', error: error.toString() });
        }
    },

    async listArgumentsForDebate(req, res) {
        const { debateId } = req.params;
        try {
            const argumentsList = await Argument.findAll({
                where: { debateId },
                include: [{
                    model: User,
                    as: 'author',
                    attributes: ['username', 'name']
                }]
            });
            res.status(200).json(argumentsList);
        } catch (error) {
            console.error('Error listing arguments:', error);
            return res.status(500).json({ message: 'Error listing arguments.', error: error.toString() });
        }
    }
};

module.exports = argumentController;
