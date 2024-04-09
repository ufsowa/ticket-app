const express = require('express');
const router = express.Router();

const Controller = require('../controllers/concert.controller');

router.route('/').get(Controller.getAll);

router.route('/random').get(Controller.getRandom);

router.route('/:id').get(Controller.getById);

router.route('/').post(Controller.addItem);

router.route('/:id').put(Controller.updateItem);

router.route('/:id').delete(Controller.deleteItem);

module.exports = router;