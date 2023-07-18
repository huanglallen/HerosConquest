'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playing.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      Playing.belongsTo(models.Hero, {
        foreignKey: "heroId",
        onDelete: "CASCADE",
        hooks: true
      });
    }
  }
  Playing.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    heroId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Playing',
  });
  return Playing;
};
