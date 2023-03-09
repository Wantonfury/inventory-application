const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

router.get('/get_categories', categoryController.get_categories);

router.get('/monitors', itemController.get_items);

router.get('/monitor/:id', itemController.get_item);

module.exports = router;
