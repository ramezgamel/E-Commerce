class ApiFeatures {
  constructor(mongooseQuery, queryParams) {
    this.mongooseQuery = mongooseQuery;
    this.queryParams = queryParams;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  fields() {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  filter() {
    const qParams = { ...this.queryParams };
    const excludedFields = ["sort", "page", "limit", "fields", "keyword"];
    excludedFields.forEach((q) => delete qParams[q]);
    let queryStr = JSON.stringify(qParams);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    if (queryStr != "") {
      this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    }
    return this;
  }

  search() {
    if (this.queryParams.keyword) {
      const reg = new RegExp(this.queryParams.keyword, "i");
      const search = {
        $or: [{ name: { $regex: reg } }, { description: { $regex: reg } }],
      };
      this.mongooseQuery = this.mongooseQuery.find(search);
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryParams.page * 1 || 1;
    const limit = this.queryParams.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
  //   const page = this.queryParams.page * 1 || 1;
  //   const limit = this.queryParams.limit * 1 || 10;
  //   const skip = (page - 1) * limit;
  //   this.query = this.query.skip(skip).limit(limit);
  //   this.page = page;
  //   this.limit = limit;
  //   this.totalPages = Math.ceil(countDocument / limit);
  //   return this;
  // }
}

module.exports = ApiFeatures;
