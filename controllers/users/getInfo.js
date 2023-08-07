const EntityFactory = require("../../entityFactory");
const { getDecodedToken } = require("../../helpers/token");

const getInfo = async (req, res, next) => {
  try {
    const { Token = null } = req.User;

    const params = getDecodedToken(Token);

    if (!params) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid token.",
      });

      return;
    }

    const userEntity = EntityFactory.getEntity("User");

    const user = await userEntity.findOne({
      where: { UserID: params.id },
      raw: true,
    });

    if (!user) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "User not found.",
      });

      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          UserID: user.UserID,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getInfo;
