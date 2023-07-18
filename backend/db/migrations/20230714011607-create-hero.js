'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Heros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      heroClass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      xp: {
        type: Sequelize.INTEGER,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Heros";
    await queryInterface.dropTable(options);
  }
};
