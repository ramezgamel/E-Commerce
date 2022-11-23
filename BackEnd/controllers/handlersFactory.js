const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const slugify = require("slugify");

module.exports = class HandlerFactory {
  static deleteOne = (model) =>
    asyncHandler(async (req, res) => {
      const document = await model.findByIdAndDelete(req.params.id);
      if (!document)
        throw new ApiError(`No document for this id: ${req.params.id}`, 404);
      return res.status(200).send();
    });

  static updateOne = (model) =>
    asyncHandler(async (req, res) => {
      if (req.body.name) {
        req.body.slug = slugify(req.body.name);
      }
      const document = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!document)
        throw new ApiError(`No document for this id: ${req.params.id}`, 404);
      res.status(200).send({ data: document });
    });

  static createOne = (model) =>
    asyncHandler(async (req, res) => {
      if (req.body.name) {
        req.body.slug = slugify(req.body.name);
      }
      if (req.file) {
          req.body.image = req.file.path;
      }
      if (req.files) {
        if (model.modelName == "Product") {
          req.body.coverImage = req.files.coverImage[0].path;
          req.body.images = req.files.images.map((img) => img.path);
        } else {
          req.body.images = req.files.images.map((img) => img.path);
        };
      }
      const document = await model.create(req.body);
      res.status(201).send({ data: document });
    });

  static getOne = (model) =>
    asyncHandler(async (req, res) => {
      let document;
      if (req.body.category) {
        document = await model.findById(req.params.id).populate({
          path: "category",
          select: "name",
        });
      }
      document = await model.findById(req.params.id);
      if (!document)
        throw new ApiError(`No document for this id: ${req.params.id}`, 404);
      res.status(200).send({ data: document });
    });

  static getAll = (model) =>
    asyncHandler(async (req, res) => {
      const documentsCount = await model.countDocuments();
      const apiFeatures = new ApiFeatures(model.find(), req.query)
        .sort()
        .search(model.modelName)
        .limitFields()
        .paginate(documentsCount);
      const { paginationResult, mongooseQuery } = apiFeatures;
      const items = await mongooseQuery;
      res
        .status(200)
        .send({ results: items.length, paginationResult, data: items });
    });
};
