const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
// @desc    add new address to addresses
// @route   POST /api/addresses
// @access  user
module.exports.addToAddresses = asyncHandler(async (req, res) => {
  const address = {
    alias: req.body.alias,
    phone: req.body.phone,
    details: req.body.details,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  const user = await User.findById(req.user._id);
  user.addresses.map((ad) => {
    if (ad.alias == address.alias)
      throw new ApiError("Alias is already exist", 400);
  });
  user.addresses.addToSet(address);
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Address added successfully to addresses",
    data: user.addresses,
  });
});
// @desc    remove specific address from addresses
// @route   DELETE /api/addresses/:id
// @access  user
module.exports.removeFromAddresses = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.body.addressId } },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Address removed successfully to addresses",
    data: user.addresses,
  });
});
// @desc    get user addresses
// @route   GET /api/addresses
// @access  user
module.exports.getUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    message: "Addresses fetched",
    data: user.addresses,
  });
});
