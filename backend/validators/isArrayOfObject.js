module.exports = (value) => {
  if (!Array.isArray(value)) {
    throw new Error("Field must be an array");
  }
  if (value.length === 0) {
    throw new Error("Array must contain at least one object");
  }
  if (
    !value.every((item) => typeof item === "object" && !Array.isArray(item))
  ) {
    throw new Error("Array must contain only objects");
  }
  return true;
};
