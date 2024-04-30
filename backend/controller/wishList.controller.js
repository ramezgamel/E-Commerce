const User = require("../model/User");
const asyncHandler = require("express-async-handler");
// @desc    add new product to wishList
// @route   POST /api/wishList
// @access  user
module.exports.addToWishList = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product added successfully to wishList",
    data: user.wishList,
  });
});
// @desc    remove specific product to wishList
// @route   DELETE /api/wishList/:id
// @access  user
module.exports.removeFromWishList = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product removed successfully to wishList",
    data: user.wishList,
  });
});
// @desc    get user wishlist
// @route   GET /api/wishList
// @access  user
module.exports.getUserWishList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishList");
  res.status(200).json({
    status: "success",
    message: "Wish list fetched",
    data: user.wishList,
  });
});
