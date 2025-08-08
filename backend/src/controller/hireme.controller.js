import HireMe from "../model/hire.model.js";

export const createHireMe = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await HireMe.create(data);
    res.status(201).json({
      success: true,
      message: "Hire me  content created succesffully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHireInformation = async (res, req) => {
  try {
    const result = await HireMe.find();
    res.status(200).json({
      success: true,
      message: "Content fetched succesffully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHireInformationById = async (req, res) => {
  const id = req.params.id;
  try {
    const res = await HireMe.findById(id);
    res.status(200).json({
      success: true,
      message: "Content fetched succesffully",
      data: res,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateHireMe = async (req, res, next) => {
  try {
    const res = await HireMe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Content updated succesffully",
      data: res,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteHireMe = async (req, res, next) => {
  try {
    const res = await HireMe.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Content deleted succesffully",
      data: res,
    });
  } catch (error) {
    res.status(400).json({
      success: falselse,
      message: error.message,
    });
  }
};
