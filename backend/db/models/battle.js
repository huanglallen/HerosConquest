'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Battle extends Model {
    static associate(models) {
      // define association here
      Battle.belongsTo(models.Hero, {
        foreignKey: "heroId"
      });
      Battle.belongsTo(models.Monster, {
        foreignKey: "monsterId"
      });
    }
  }
  Battle.init({
    heroId: DataTypes.INTEGER,
    monsterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Battle',
  });
  return Battle;
};
