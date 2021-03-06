const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
/**
 * success schema
 * @typedef {object} SuccessSchema
 * @property {boolean} error - error
 * @property {number} status - status
 * @property {string} body - list data
 */

/**
* GET /api/list
* @summary List endpoint
* @return {SuccessSchema} 200 - success response - application/json
* @return {object} 500 - Bad request response
*/
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

function list (req, res) {
    Controller.list()
        .then(lista => response.success(req, res, lista, 200))
        .catch(({ message }) => response.error(req, res, message, 500));
};

function get (req, res) {
    Controller.get(req.params.id)
        .then(user => response.success(req, res, user, 200))
        .catch(({ message }) => response.error(req, res, message, 500));
};

function upsert (req, res) {
    Controller.upsert(req.body)
        .then(user => response.success(req, res, user, 201))
        .catch(({ message }) => response.error(req, res, message, 500));
};

module.exports = router;
