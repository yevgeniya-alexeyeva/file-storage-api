const sequelize = require("sequelize");
const crypto = require("crypto");
const EntityFactory = require("../../entityFactory");
const userUtils = require("./user.utils");
const SequelizeOperators = sequelize.Op;
const { addToken, addRefreshToken } = require("../../helpers/token");

const signin = async (req, res, next) => {
  try {
    const invalid = userUtils.registerValidation(["Password"], req?.body);

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

    const User = EntityFactory.getEntity("User");

    const user = await User.findOne({
      where: userWhereParams,
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

    const Token = addToken(user.UserID);
    const RefreshToken = addRefreshToken(user.UserID);

    await User.update({ Token }, { where: { UserID: user.UserID } });

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          Token,
          RefreshToken,
          User: {
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
          },
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
