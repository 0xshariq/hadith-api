import axios from "axios";
import ErrorHandler from "../middleware/error.js";

// Get Hadith by Number
export const getHadithByNumber = async (req, res, next) => {
  try {
    const { edition, number } = req.params;

    if (!edition) {
      return res.status(400).json({
        code: 400,
        status: "Error",
        message:
          "Missing hadith parameter. Use '/editionLanguage-editionName' to get a hadith",
      });
    }

    const [editionLanguage, editionName] = edition.split("-");
    if (!editionLanguage || !editionName) {
      return res.status(400).json({
        code: 400,
        status: "Error",
        message:
          "Invalid hadith format. Use 'editionLanguage-editionName' to get a hadith",
      });
    }

    const baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionLanguage}-${editionName}/${number}.json`;
    const { data } = await axios.get(baseUrl);

    res.json(data);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

// Get All Hadith Editions
export const getAllEditions = async (req, res, next) => {
  try {
    const baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json`;
    const { data } = await axios.get(baseUrl);

    res.json(data);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

// Get Hadith Sections
export const getSections = async (req, res, next) => {
  try {
    const { edition, number } = req.params;

    if (!edition) {
      return res.status(400).json({
        code: 400,
        status: "Error",
        message:
          "Missing hadith parameter. Use '/editionLanguage-editionName' to get a section",
      });
    }

    const [editionLanguage, editionName] = edition.split("-");
    if (!editionLanguage || !editionName) {
      return res.status(400).json({
        code: 400,
        status: "Error",
        message:
          "Invalid hadith format. Use 'editionLanguage-editionName' to get a section",
      });
    }

    const baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionLanguage}-${editionName}/sections/${number}.json`;
    const { data } = await axios.get(baseUrl);

    res.json(data);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

// Get Hadith API Information
export const getInfo = async (req, res, next) => {
  try {
    const baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/info.json`;
    const { data } = await axios.get(baseUrl);

    res.json(data);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};

export const getRandomHadith = async (req, res, next) => {
  const { bookName } = req.query;
  try {
    const baseUrl = `https://random-hadith-generator.vercel.app/${bookName}`;
    const { data } = await axios.get(baseUrl);

    res.json(data);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};
