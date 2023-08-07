const EntityFactory = require("../../entityFactory");
const fileUtils = require("./file.utils");

const list = async (req, res, next) => {
  try {
    const invalid = fileUtils.crudValidation([], req?.body);

    if (invalid) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: invalid,
      });

      return;
    }

    const { list_size: listSize = 10, page = 1 } = req.body;

    const paginationParams = {
      limit: parseInt(listSize),
      offset: parseInt(listSize * (page - 1)),
    };

    const fileEntity = EntityFactory.getEntity("File");

    const files = await fileEntity.findAll(paginationParams);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: files,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = list;
