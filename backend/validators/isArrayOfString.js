module.exports = (value) => {
  if (!Array.isArray(value)) {
    throw new Error("Field must be an array");
  }
  if (value.length < 1) throw new Error("At least one item provide");
  if (value.some((item) => typeof item !== "string")) {
    throw new Error("Each element in the array must be a string");
  }
  return true;
};
