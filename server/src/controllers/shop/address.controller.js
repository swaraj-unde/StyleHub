import { Address } from "../../models/address.model.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required address details.",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    return res.status(201).json({
      success: true,
      message: "Address added successfully.",
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Failed to add address. Please try again later.",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const addressList = await Address.find({ userId });

    return res.status(200).json({
      success: true,
      message: "Addresses fetched successfully.",
      data: addressList,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch addresses. Please try again later.",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required.",
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      data: updatedAddress,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Failed to update address. Please try again later.",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required.",
      });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully.",
      data: deletedAddress,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Failed to delete address. Please try again later.",
    });
  }
};

export { addAddress, deleteAddress, editAddress, fetchAllAddress };
