'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gold extends Model {
    static associate(models) {
      // define association here
      Gold.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Gold.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Gold',
  });
  return Gold;
};
