const path = require("path");
const fs = require("fs");
const EntityFactory = require("../../entityFactory");
const config = require("../../configs");

const download = async (req, res, next) => {
  try {
    const { id: FileID = null } = req?.params;

    const FileEntity = EntityFactory.getEntity("File");

    const file = await FileEntity.findOne({ where: { FileID }, raw: true });

    if (!file) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "File not found",
      });

      return;
    }

    const filePath = path.join(
      config.storage.file,
      `${FileID}_${file.FileName}`
    );

    const fileExist = fs.existsSync(filePath);

    if (!fileExist) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "File not found",
      });
    }

    const stream = fs.createReadStream(filePath);
    const fileStats = fs.statSync(filePath);
    res.setHeader("Content-length", fileStats.size);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.FileName}`
    );

    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

module.exports = download;
