const Category = require('../models/category')

exports.get_categories = (req, res, next) => {
  Category.find()
    .select({ name: 1, _id: 1 })
    .then(categories => res.send(categories))
    .catch(err => next(err));
}