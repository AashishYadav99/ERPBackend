"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    static associate(models) {
      this.hasMany(models.company_address, {
        foreignKey: "company_id",
        as: "company_address",
      });
      this.hasMany(models.company_bank, {
        foreignKey: "company_id",
        as: "company_bank",
      });
      this.hasMany(models.company_location, {
        foreignKey: "company_id",
        as: "company_location",
      });
      this.hasMany(models.location, {
        foreignKey: "ccompany",
        as: "location",
      });
    }
  }
  company.init(
    {
      // uuid: DataTypes.STRING(255),
      // ccountry: DataTypes.STRING(255),

      compdesc: DataTypes.STRING(255),
      clogo: DataTypes.STRING(255),
      compcode: DataTypes.STRING(255),
      itemdesclong: DataTypes.STRING(255),

      ccompany: DataTypes.STRING(255),
      ccountry: DataTypes.BIGINT,
      ccurrency: DataTypes.BIGINT,

      clicense: DataTypes.STRING(255),
      ctaxnumber: DataTypes.STRING(255),
      cacurrency: DataTypes.BIGINT,
      note1: DataTypes.STRING(255),
      note2: DataTypes.STRING(255),
      note3: DataTypes.STRING(255),
      itmcatdt1: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.NOW,
      },
      itmcatdt2: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.NOW,
      },
      addedby: DataTypes.BIGINT,
      status: DataTypes.TINYINT(1),
    },
    {
      sequelize,
      modelName: "company",
      tableName: "companies",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return company;
};
