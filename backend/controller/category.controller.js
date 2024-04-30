const Category = require("../model/Category");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");
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
module.exports.createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const newCat = new Category({ name, image });
  await newCat.save();
  res.status(200).json({ status: "success", data: newCat });
});
// @desc    get a category
// @route   GET /api/categories/:id
// @access  public
module.exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError("ID not provide", 404);
  const category = await Category.findById(id);
  if (!category) throw new ApiError("No Category with this id", 404);
  res.status(200).json({ status: "success", data: category });
});
// @desc    update Category
// @route   PUT /api/categories/:id
// @access  Admin
module.exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  if (!id) throw new ApiError("ID not provide", 404);
  const category = await Category.findById(id);
  if (!category) throw new ApiError("No Category with this id", 404);
  category.name = name | category.name;
  category.image = image | category.image;
  await category.save();
  res.status(200).json({ status: "success", data: category });
});
// @desc    delete Category
// @route   DELETE /api/categories/:id
// @access  Admin
module.exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError("ID not provide", 404);
  await Category.findByIdAndDelete(id);
  res.status(200).json({ status: "success", data: "Category deleted" });
});
