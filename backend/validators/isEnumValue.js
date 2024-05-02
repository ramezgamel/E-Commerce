module.exports = (values) => {
  return (value) => {
    if (!values.includes(value)) {
      throw new Error(
        `Field must be one of the following values: ${values.join(", ")}`
      );
    }
    return true;
  };
};
