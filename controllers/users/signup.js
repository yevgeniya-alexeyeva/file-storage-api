const sequelize = require("sequelize");
const crypto = require("crypto");
const EntityFactory = require("../../entityFactory");
const userUtils = require("./user.utils");
const SequelizeOperators = sequelize.Op;
const { createToken, createRefreshToken } = require("../../helpers/token");

const addUser = async (req, res, next) => {
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

    const userWhereParams = {
      UserID: { [SequelizeOperators.or]: [Email, PhoneNumber] },
    };

    const userEntity = EntityFactory.getEntity("User");

    const userExists = await userEntity.findOne({
      where: userWhereParams,
      raw: true,
    });

    if (userExists) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "User already exists.",
      });
      return;
    }

    const newUser = await userEntity.create({
      UserID: Email || PhoneNumber,
      Email,
      PhoneNumber,
      Password: crypto.createHash("md5").update(Password).digest("hex"),
    });

    if (!newUser) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
    }

    const Token = createToken(newUser.UserID);
    const RefreshToken = createRefreshToken(newUser.UserID);

    await userEntity.update({ Token }, { where: { UserID: newUser.UserID } });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Registration successful",
      data: {
        result: {
          Token,
          RefreshToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
