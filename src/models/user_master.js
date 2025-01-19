"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.customer_info, {
        foreignKey: "user_id",
        as: "customerInfo",
      });

      this.hasOne(models.salesman_info, {
        foreignKey: "user_id",
        as: "salesmanInfo",
      });

      this.belongsTo(models.country_masters, {
        foreignKey: "country_id",
        as: "country",
      });
    }
  }
  user_master.init(
    {
      email: {
        type: DataTypes.STRING(256),
      },
      password: {
        type: DataTypes.STRING(256),
      },
      usertype: {
        type: DataTypes.BIGINT,
      },
      parent_id: {
        type: DataTypes.STRING(256),
      },
      firstname: {
        type: DataTypes.STRING(256),
      },
      lastname: {
        type: DataTypes.STRING(256),
      },
      api_token: {
        type: DataTypes.STRING(256),
      },
      mobile: {
        type: DataTypes.STRING(256),
      },
      country_id: {
        type: DataTypes.BIGINT,
      },
      is_approved_by_admin: {
        type: DataTypes.TINYINT(1),
      },
      status: {
        type: DataTypes.TINYINT(1),
      },
      login_type: {
        type: DataTypes.STRING(256),
      },
      role_id: {
        type: DataTypes.INTEGER(11),
      },

      uuid: DataTypes.CHAR(36),
      usertype: DataTypes.BIGINT,
      parent_id: DataTypes.STRING(191),
      firstname: DataTypes.STRING(191),
      lastname: DataTypes.STRING(191),
      email: DataTypes.STRING(191),
      password: DataTypes.STRING(191),
      api_token: DataTypes.STRING(191),
      // email_verified_at: "",
      email_verified_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW, // Sets default to current timestamp
      },
      mobile: DataTypes.STRING(191),
      country_id: DataTypes.INTEGER(11),
      is_approved_by_admin: DataTypes.TINYINT(1),
      status: DataTypes.TINYINT(1),
      id_stripe: DataTypes.STRING(191),
      login_type: {
        type: DataTypes.ENUM(
          "system",
          "google",
          "facebook",
          "twitter",
          "mobile"
        ),
        default: "system",
      },
      role_id: DataTypes.INTEGER(11),
      remember_token: DataTypes.STRING(191),
      ad_id: DataTypes.STRING(100),
      employe_code: DataTypes.STRING(191),

      cusbrand: DataTypes.STRING(191),
      cuscomname: DataTypes.STRING(191),
      category: DataTypes.STRING(191),
      custitle: DataTypes.STRING(191),
      cussname: DataTypes.STRING(191),
      cusemail1: DataTypes.STRING(191),
      subemail2: DataTypes.STRING(191),
      cusemail3: DataTypes.STRING(191),
      cusemail4: DataTypes.STRING(191),
      custax1: DataTypes.STRING(191),
      custax2: DataTypes.STRING(191),
      custax3: DataTypes.STRING(191),
      cusauth: DataTypes.STRING(191),
      cusfax: DataTypes.BIGINT,
      cusdob: DataTypes.DATE,
      cusanndt: DataTypes.DATE,
      custoll: DataTypes.BIGINT,
      cusconpername: DataTypes.STRING(191),
      cusconpername2: DataTypes.STRING(191),
      cusconpername3: DataTypes.STRING(191),
      cusphone: DataTypes.BIGINT,
      cusphone2: DataTypes.BIGINT,
      cusphone3: DataTypes.BIGINT,
      mobile2: DataTypes.BIGINT,
      custaxdt1: DataTypes.DATE,
      custaxdt2: DataTypes.DATE,
      note1: DataTypes.STRING(191),
      note2: DataTypes.STRING(191),
      addedby: DataTypes.BIGINT,
      createddt: DataTypes.DATE,
      cusadd3: DataTypes.STRING(191),
      otherno: DataTypes.STRING(191),
    },
    {
      sequelize,
      modelName: "user_master",
      tableName: "users",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      hooks: {
        beforeSave: async (user, options) => {
          if (user.password && user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );
  return user_master;
};
