const EntityFactory = require("../../entityFactory");

const getFileInfo = async (req, res, next) => {
  try {
    const { id: FileID = null } = req?.params;

    const fileEntity = EntityFactory.getEntity("File");

    const file = await fileEntity.findOne({
      where: { FileID },
      raw: true,
    });

    if (!file) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "File not found.",
      });

      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: file,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getFileInfo;
