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
        Secret: {
          type: DataTypes.STRING(255),
          field: "Secret",
          allowNull: true,
          defaultValue: "",
        },
        Expiration: {
          type: DataTypes.BIGINT.UNSIGNED,
          field: "Expiration",
          allowNull: false,
          defaultValue: 10,
        },
      },
      {
        modelName: "User",
        tableName: "User",
        sequelize,
      }
    );
  }

  //   static associate(models) {
  //     const {
  //      File,
  //     } = models;
  //     this.hasMany(File, {
  //       as: "Files",
  //       foreignKey: {
  //         name: "UserID",
  //         allowNull: false,
  //         onDelete: "CASCADE",
  //         onUpdate: "CASCADE",
  //       },
  //     });
  //   }
}

module.exports = User;
