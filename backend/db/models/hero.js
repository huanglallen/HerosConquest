'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      // define association here
      Hero.hasMany(models.Battle, {
        foreignKey: "heroId",
        onDelete: "CASCADE",
        hooks: true
      });
      Hero.hasMany(models.Playing, {
        foreignKey: "heroId",
        onDelete: "CASCADE",
        hooks: true
      });
      Hero.belongsTo(models.User, {
        foreignKey: "ownerId"
      });
    }
  }
  Hero.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 12
      }
    },
    heroClass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    xp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    att: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    def: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spd: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attSpd: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Hero',
  });
  return Hero;
};
