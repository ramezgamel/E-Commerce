const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.updateOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let document = await Model.findById(id);
    if (!document) throw new ApiError(`No document for this id ${id}`, 404);
    if (document.user) {
      const { _id, role } = req.user;
      if (_id !== document.user && role !== "admin")
        throw new Error("Only creator or admin can update");
    }
    Object.keys(req.body).forEach((key) => {
      document[key] = req.body[key];
    });
    await document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    const document = await query;
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, populationOpt) =>
  asyncHandler(async (req, res) => {
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate(documentsCounts)
      .filter()
      .search()
      .fields()
      .sort();
    let { mongooseQuery, paginationResult } = apiFeatures;
    if (populationOpt) {
      mongooseQuery = mongooseQuery.populate(populationOpt);
    }
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) throw new ApiError(`No document for this id ${id}`, 404);
    res.status(204).send("deleted success");
  });
