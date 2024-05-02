const Category = require("../model/Category");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");
const { updateOne, createOne, deleteOne, getOne } = require("./factory");
// @desc    get all categories
// @route   GET /api/categories
// @access  public
module.exports.getCategories = asyncHandler(async (req, res) => {
  const countDocument = await Category.countDocuments();
  const features = new ApiFeatures(Category.find(), req.query)
    .fields()
    .filter()
    .search()
    .sort()
    .paginate(countDocument);
  const categories = await features.query;
  res.status(200).json({
    status: "success",
    totalPages: features.totalPages,
    page: features.page,
    limit: features.limit,
    result: categories,
  });
});
// @desc    add new category
// @route   POST /api/categories
// @access  Admin
module.exports.createCategory = createOne(Category);

// @desc    get a category
// @route   GET /api/categories/:id
// @access  public
module.exports.getCategory = getOne(Category);
// @desc    update Category
// @route   PUT /api/categories/:id
// @access  Admin
module.exports.updateCategory = updateOne(Category);
// @desc    delete Category
// @route   DELETE /api/categories/:id
// @access  Admin
module.exports.deleteCategory = deleteOne(Category);
