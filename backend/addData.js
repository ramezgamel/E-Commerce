const faker = require("faker");
const createUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
    password: "123",
  };
};
const createProduct = () => {
  return {};
};
