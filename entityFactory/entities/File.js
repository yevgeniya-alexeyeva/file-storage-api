const { Sequelize, DataTypes } = require("sequelize");

class File extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        FileID: {
          type: DataTypes.STRING(50),
          field: "FileID",
          primaryKey: true,
          unique: true,
          validate: { notEmpty: true },
          allowNull: false,
          defaultValue: Sequelize.fn("UUID_SHORT"),
        },
        FileName: {
          type: DataTypes.STRING(50),
          validate: { notEmpty: true },
          field: "FileName",
          allowNull: false,
        },
        Extension: {
          type: DataTypes.STRING(50),
          validate: { notEmpty: true },
          field: "Extension",
          allowNull: false,
        },
        MimeType: {
          type: DataTypes.STRING(64),
          validate: { notEmpty: true },
          field: "MimeType",
          allowNull: false,
        },
        Size: {
          type: DataTypes.STRING(50),
          validate: { notEmpty: true },
          field: "Size",
          allowNull: false,
        },
        UploadAt: {
          type: DataTypes.DATE(),
          field: "Size",
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        modelName: "File",
        tableName: "File",
        sequelize,
      }
    );
  }
}

module.exports = File;
