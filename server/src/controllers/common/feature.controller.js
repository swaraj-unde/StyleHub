import { Feature } from "../../models/feature.model.js";

export const addFeature = async (req, res) => {
  try {
    const { image } = req.body;

    const feature = new Feature({
      image,
    });

    await feature.save();

    return res.status(201).json({
      success: true,
      message: "Feature Image Uplaoded Successfully",
      data: feature,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeature = async (req, res) => {
  try {
    const feature = await Feature.find({});

    return res.status(201).json({
      success: true,
      message: "Feature Image fetched Successfully",
      data: feature,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
