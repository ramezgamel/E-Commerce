const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const {
  addToAddresses,
  removeFromAddresses,
  getUserAddresses,
} = require("../controller/addresses.controlle");
router.use(protect);
router
  .route("/")
  .post(addToAddresses)
  .delete(removeFromAddresses)
  .get(getUserAddresses);

module.exports = router;
