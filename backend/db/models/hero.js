'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      // define association here
      Hero.hasMany(models.Battle, {
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
    ownerId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 12]
      }
    },
    class: {
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
      validate: {
        args: [1, 1],
        msg: "attSpd must be a FLOAT value of one decimal"
      }
    }
  }, {
    sequelize,
    modelName: 'Hero',
  });
  return Hero;
};
