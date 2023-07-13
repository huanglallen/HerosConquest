'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Monsters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      att: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      def: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      spd: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      attSpd: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      xp_drop: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Monsters";
    await queryInterface.dropTable(options);
  }
};
