const EntityFactory = require("../../entityFactory");
const { getUserID } = require("../../helpers/token");

const logout = async (req, res, next) => {
  try {
    const { Token = null } = req.User;

    const params = getUserID(Token);

    if (!params) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid token.",
      });

      return;
    }

    const UserEntity = EntityFactory.getEntity("User");

    await UserEntity.update(
      { Token: null },
      {
        where: { UserID: params.id },
        raw: true,
      }
    );

    res.json({
      status: "success",
      code: 200,
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
