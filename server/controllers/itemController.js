const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

exports.get_items = (req, res, next) => {
  Category.findOne({ name: req.query.panel })
    .select({ name: 0, __v: 0 })
    .catch(err => next(err))
    .then(category => {
      Item.find(category ? { category } : {})
        .catch(err => next(err))
        .then(monitors => res.send(monitors));
    });
}

exports.get_item = (req, res, next) => {
  Item.findById(req.params.id)
    .catch(err => next(err))
    .then(item => res.send(item));
}