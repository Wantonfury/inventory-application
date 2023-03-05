const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  Item.findById(req.params.id)
    .populate("category")
    .exec((err, item) => {
      if (err) return next(err);
      
      if (item == null) {
        const error = new Error('Item not found.');
        error.status = 404;
        return next(error);
      }
      
      res.send({ item });
    });
}