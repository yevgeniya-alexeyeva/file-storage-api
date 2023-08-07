const EntityFactory = require("../../entityFactory");
const { getDecodedToken } = require("../../helpers/token");

const logout = async (req, res, next) => {
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

    await userEntity.update(
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
