const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const EntityFactory = require("../../entityFactory");
const config = require("../../configs");

const upload = async (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "No file chosen.",
    });

    return;
  }
  const { path: tempName, originalname, size, mimetype } = req.file;

  const { FileName = originalname } = req.body;

  try {
    const FileID = v4();

    const fileName = path.join(config.storage.file, `${FileID}_${FileName}`);

    fs.rename(tempName, fileName);

    const fileCreateParams = {
      FileID,
      FileName,
      Extension: path.extname(originalname).toLocaleLowerCase(),
      MimeType: mimetype,
      Size: size,
      UploadAt: new Date(),
    };

    const fileEntity = EntityFactory.getEntity("File");

    await fileEntity.create(fileCreateParams);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          FileID,
          fileUrl: fileName,
        },
      },
    });
  } catch (error) {
    fs.unlink(tempName);
    next(error);
  }
};

module.exports = upload;
