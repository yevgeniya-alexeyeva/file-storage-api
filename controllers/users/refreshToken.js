const EntityFactory = require("../../entityFactory");
const userUtils = require("./user.utils");
const {
  createToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/token");

const refreshToken = async (req, res, next) => {
  try {
    const invalid = userUtils.registerValidation(["RefreshToken"], req?.body);

    if (invalid) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: invalid,
      });

      return;
    }

    const { RefreshToken } = req.body;

    const decodedToken = verifyRefreshToken(RefreshToken);

    if (!decodedToken) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Invalid Refresh token",
      });

      return;
    }

    const userEntity = EntityFactory.getEntity("User");

    const user = await userEntity.findOne({
      where: { UserID: decodedToken.id },
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

    const newToken = createToken(user.UserID);
    const newRefreshToken = createRefreshToken(user.UserID);

    await userEntity.update(
      { Token: newToken },
      { where: { UserID: user.UserID } }
    );

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          Token: newToken,
          RefreshToken: newRefreshToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = refreshToken;
