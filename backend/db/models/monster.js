'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Monster extends Model {
    static associate(models) {
      // define association here
      Monster.hasMany(models.Battle, {
        foreignKey: "monsterId",
        onDelete: "CASCADE",
        hooks: true
      });

    }
  }
  Monster.init({
    name: {
      type: DataTypes.STRING,
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
    },
    xpDrop: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Monster',
  });
  return Monster;
};
