const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const EntityFactory = require("../../entityFactory");


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
    const uploadDir = path.join(process.cwd(), "public", "files");

    const fileName = path.join(uploadDir, `${FileName || originalname}`);

    fs.rename(tempName, fileName);

    const FileID = v4();

    const fileCreateParams = {
      FileID,
      FileName,
      Extension: path.extname(originalname).toLocaleLowerCase(),
      MimeType: mimetype,
      Size: size,
      UploadAt: new Date(),
    };

    const FileEntity = EntityFactory.getEntity("File");

    await FileEntity.create(fileCreateParams);

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
