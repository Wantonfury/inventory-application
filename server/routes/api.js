const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

router.get('/categories', categoryController.get_categories);

router.get('/items', itemController.get_items);

router.get('/item/:id', itemController.get_item);

router.post('/item/:id?', itemController.set_item);

module.exports = router;
