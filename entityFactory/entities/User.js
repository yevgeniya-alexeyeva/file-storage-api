const { Sequelize, DataTypes } = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        UserID: {
          type: DataTypes.STRING(50),
          field: "UserID",
          primaryKey: true,
          unique: true,
          validate: { notEmpty: true },
          allowNull: false,
          defaultValue: Sequelize.fn("UUID_SHORT"),
        },
        Password: {
          type: DataTypes.STRING(255),
          validate: { notEmpty: true },
          field: "Password",
          allowNull: true,
        },
        Email: {
          type: DataTypes.STRING(100),
          validate: { notEmpty: true, isEmail: true },
          field: "Email",
          allowNull: true,
        },
        PhoneNumber: {
          type: DataTypes.STRING(255),
          validate: { notEmpty: true },
          field: "PhoneNumber",
          allowNull: true,
        },
        Token: {
          type: DataTypes.STRING(255),
          validate: { notEmpty: true },
          field: "Token",
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "User",
        sequelize,
      }
    );
  }
}

module.exports = User;
