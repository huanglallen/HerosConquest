'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Battles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heroId: {
        type: Sequelize.INTEGER
      },
      monsterId: {
        type: Sequelize.INTEGER
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Battles";
    await queryInterface.dropTable(options);
  }
};
