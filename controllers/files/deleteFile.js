const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");
const EntityFactory = require("../../entityFactory");
const config = require("../../configs");

const deleteFile = async (req, res, next) => {
  try {
    const { id: FileID = null } = req?.params;

    const fileEntity = EntityFactory.getEntity("File");

    const file = await fileEntity.findOne({ where: { FileID }, raw: true });

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

      return;
    }

    fsPromises.unlink(filePath);

    await fileEntity.destroy({ where: { FileID } });

    res.json({
      status: "success",
      code: 200,
      message: "File deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteFile;
