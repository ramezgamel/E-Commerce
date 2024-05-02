const Category = require("../model/Category");
const factory = require("./factory");
// @desc    get all categories
// @route   GET /api/categories
// @access  public
module.exports.getCategories = factory.getAll(Category);
// @desc    add new category
// @route   POST /api/categories
// @access  Admin
module.exports.createCategory = factory.createOne(Category);
// @desc    get a category
// @route   GET /api/categories/:id
// @access  public
module.exports.getCategory = factory.getOne(Category);
// @desc    update Category
// @route   PUT /api/categories/:id
// @access  Admin
module.exports.updateCategory = factory.updateOne(Category);
// @desc    delete Category
// @route   DELETE /api/categories/:id
// @access  Admin
module.exports.deleteCategory = factory.deleteOne(Category);
