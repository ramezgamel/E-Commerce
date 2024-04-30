const router = require("express").Router();
const { protect } = require("../middleware/auth.middelware");
const {
  addToWishList,
  removeFromWishList,
  getUserWishList,
} = require("../controller/wishList.controller");
router.use(protect);
router
  .route("/")
  .post(addToWishList)
  .delete(removeFromWishList)
  .get(getUserWishList);

module.exports = router;
