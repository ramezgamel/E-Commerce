module.exports = class ApiFeatures {
  constructor(mongooseQuery, reqQuery) {
    this.reqQuery = reqQuery;
    this.mongooseQuery = mongooseQuery;
  }

  paginate(documentsCount) {
    const page = +this.reqQuery.page || 1;
    const limit = +this.reqQuery.limit || 10;
    const skip = (page - 1) * limit;
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(documentsCount / limit);
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }

  search(modelName) {
    const { keyword } = this.reqQuery;
    if (keyword) {
      if (modelName == "Product"){
        this.mongooseQuery = this.mongooseQuery.find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { desc: { $regex: keyword, $options: "i" } },
          ],
        });
      }else {
        this.mongooseQuery = this.mongooseQuery.find({name: {$regex: keyword, $options: "i" }});
      }
    }
    return this;
  }

  limitFields() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__V");
    }
    return this;
  }
};

//  limitFields filter
