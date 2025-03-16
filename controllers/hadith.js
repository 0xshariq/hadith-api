import axios from "axios";
import ErrorHandler from "../middleware/error.js";

export const getHadithByNumber = async (req, res) => {
  try {
    const { edition, number } = req.params;
    if (!edition) {
      return res.status(400).json({
        code: 400,
        status: "Error",
        message:
          "Missing hadth parameter. Use '/editionLanguage-editionName' to get a hadith",
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
    const hadith = await axios.get(baseUrl);
    res.json(hadith);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
};


export const getAllEditions = async (req, res) => {
    try {
        const baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json`;
        const editions = await axios.get(baseUrl);
        res.json(editions);
    } catch (error) {
        new ErrorHandler(500, error.message);
    }
}

export const getSections = async (req, res) => {
    try {
        const { edition, number } = req.params;
        if (!edition) {
            return res.status(400).json({
                code: 400,
                status: "Error",
                message:
                    "Missing hadth parameter. Use '/editionLanguage-editionName' to get a section",
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
        const sections = await axios.get(baseUrl);
        res.json(sections);
    } catch (error) {
        new ErrorHandler(500, error.message);
    }
}
export const getInfo = async (req, res) => {
    try {
        const baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/info.json`;
        const info = await axios.get(baseUrl);
        res.json(info);
    } catch (error) {
        new ErrorHandler(500, error.message);
    }
}