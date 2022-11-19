const asyncHandler = require("express-async-handler");

function pagination(model) {
  return asyncHandler(async (req, res, next) => {
    
    // const page = +req.query.page || 1;
    // const limit = +req.query.limit || 10;
    // const skip = (page - 1) * limit;
    // let filterObject = {};
    // if (req.params.categoryId)
    //   filterObject = { category: req.params.categoryId };
    // const items = await model.find(filterObject).skip(skip).limit(limit).populate({path: "category", select:"name"});
    // req.paginationResult = { page, limit, results: items.length ,data: items };
    next();
  });
}

module.exports = pagination;
