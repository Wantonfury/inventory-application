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

exports.set_item = [
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("modelNo", "Model number must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock", "Stock must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isNumeric().withMessage("Stock must be a number."),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isNumeric().withMessage("Price must be a number."),
  async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: 'Validation error',
        body: req.body,
        errors: errors.array({ onlyFirstError: true }).map(err => err.msg)
      });
    }
    
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      modelNo: req.body.modelNo,
      category: req.body.category,
      stock: req.body.stock,
      price: req.body.price
    });
    
    if (req.params.id) {
      item._id = req.params.id;
      
      try {
        await Item.findByIdAndUpdate(req.params.id, item);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    } else {
      try {
        item.save();
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  }
];