const Category = require("../model/Category");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures");
const ApiError = require("../utils/apiError");

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

module.exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newCat = new Category({ name });
  if (req.file) {
    newCat.image = req.file.url;
  }
  await newCat.save();
  res.status(200).json({ status: "success", data: newCat });
});

module.exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError("ID not provide", 404);
  const category = await Category.findById(id);
  if (!category) throw new ApiError("No Category with this id", 404);
  res.status(200).json({ status: "success", data: category });
});

module.exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id) throw new ApiError("ID not provide", 404);
  const category = await Category.findById(id);
  if (!category) throw new ApiError("No Category with this id", 404);
  category.name = name;
  if (req.file) {
    category.image = req.file.url;
  }
  await category.save();
  res.status(200).json({ status: "success", data: category });
});

module.exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError("ID not provide", 404);
  await Category.findByIdAndDelete(id);
  res.status(200).json({ status: "success", data: "Category deleted" });
});
