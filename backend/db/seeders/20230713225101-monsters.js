'use strict';

const { Monster } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Monster.bulkCreate([
      {
        name: 'zombie',
        hp: 10,
        att: 1,
        def: 1,
        spd: 1,
        attSpd: 2,
        xpDrop: 1
      },
      {
        name: 'Death Knight',
        hp: 25,
        att: 3,
        def: 1,
        spd: 1,
        attSpd: 2,
        xpDrop: 1
      },
      {
        name: 'The Lurker',
        hp: 150,
        att: 50,
        def: 1,
        spd: 1,
        attSpd: 2,
        xpDrop: 1
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Monsters';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      def: { [Op.in]: [1] }
    }, {});
  }
};
