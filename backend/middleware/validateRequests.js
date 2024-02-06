//middleware/validateRequests.js


const { check, validationResult } = require('express-validator');
const { isContentAppropriate } = require('../utilities/contentFilter');

exports.validateDebateCreation = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('description').not().isEmpty().withMessage('Description is required'),

];

exports.validateArgumentSubmission = [
    check('content')
        .isLength({ max: 500 }).withMessage('Argument must not exceed 500 characters')
        .custom(isContentAppropriate).withMessage('Content includes prohibited keywords'),
   
];

exports.validateReportSubmission = [
    check('reason').not().isEmpty().withMessage('Reason is required'),

];

exports.validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
