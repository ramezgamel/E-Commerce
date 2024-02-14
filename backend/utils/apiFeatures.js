class ApiFeatures {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  fields() {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
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
      this.query = this.query.find(JSON.parse(queryStr));
    }
    return this;
  }

  search() {
    if (this.queryParams.keyword) {
      const reg = new RegExp(this.queryParams.keyword, "i");
      const search = {
        $or: [{ name: { $regex: reg } }, { description: { $regex: reg } }],
      };
      this.query = this.query.find(search);
    }
    return this;
  }
  paginate(countDocument) {
    const page = this.queryParams.page * 1 || 1;
    const limit = this.queryParams.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(countDocument / limit);
    return this;
  }
}

module.exports = ApiFeatures;
