const sequelize = require("sequelize");
const crypto = require("crypto");
const EntityFactory = require("../../entityFactory");
const userUtils = require("./user.utils");
const SequelizeOperators = sequelize.Op;

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

    const User = EntityFactory.getEntity("User");

    const userExists = await User.findOne({
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

    const newUser = await User.create({
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

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Registration successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
