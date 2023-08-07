const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");
const EntityFactory = require("../../entityFactory");
const config = require("../../configs");

const update = async (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "No file chosen.",
    });

    return;
  }

  const { id: FileID = null } = req.params;

  const { path: tempName, originalname, size, mimetype } = req.file;

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

  try {
    // check if old file exist in storage
    const oldFilePath = path.join(
      config.storage.file,
      `${FileID}_${file.FileName}`
    );

    const fileExist = fs.existsSync(oldFilePath);

    if (!fileExist) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "File not found",
      });
    }

    const { FileName = originalname } = req.body;

    const filePath = path.join(config.storage.file, `${FileID}_${FileName}`);

    fsPromises.unlink(oldFilePath);

    fsPromises.rename(tempName, filePath);

    const fileUpdateParams = {
      FileName,
      Extension: path.extname(originalname).toLocaleLowerCase(),
      MimeType: mimetype,
      Size: size,
      UploadAt: new Date(),
    };

    const fileEntity = EntityFactory.getEntity("File");

    await fileEntity.update(fileUpdateParams, { where: { FileID } });

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          FileID,
          fileUrl: filePath,
        },
      },
    });
  } catch (error) {
    fsPromises.unlink(tempName);
    next(error);
  }
};

module.exports = update;
