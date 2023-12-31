const sequelize = require("sequelize");
const crypto = require("crypto");
const EntityFactory = require("../../entityFactory");
const userUtils = require("./user.utils");
const SequelizeOperators = sequelize.Op;
const { createToken, createRefreshToken } = require("../../helpers/token");

const signin = async (req, res, next) => {
  try {
    const invalid = userUtils.authValidation(["Password"], req?.body);

    if (invalid) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: invalid,
      });

      return;
    }

    const { Email = null, PhoneNumber = null, Password } = req.body;

    if (!(Email || PhoneNumber)) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Email or PhoneNumber is required",
      });

      return;
    }

    const password = crypto.createHash("md5").update(Password).digest("hex");

    const userWhereParams = {
      UserID: { [SequelizeOperators.or]: [Email, PhoneNumber] },
      Password: password,
    };

    const userEntity = EntityFactory.getEntity("User");

    const User = await userEntity.findOne({
      where: userWhereParams,
      raw: true,
    });

    if (!User) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "User not found.",
      });

      return;
    }

    const Token = createToken(User.UserID);
    const RefreshToken = createRefreshToken(User.UserID);

    await userEntity.update({ Token }, { where: { UserID: User.UserID } });

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          Token,
          RefreshToken,
          User: {
            Email: User.Email,
            PhoneNumber: User.PhoneNumber,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
