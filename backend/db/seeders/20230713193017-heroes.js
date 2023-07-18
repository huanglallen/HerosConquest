'use strict';

const { Hero } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Hero.bulkCreate([
      {
        ownerId: 2,
        name: 'caster',
        heroClass: 'Mage',
        level: 16,
        xp: 8,
        hp: 35,
        att: 23,
        def: 23,
        spd: 23,
        attSpd: 2.0
      },
      {
        ownerId: 2,
        name: 'AngerIssues',
        heroClass: 'Berserker',
        level: 92,
        xp: 18,
        hp: 999,
        att: 999,
        def: 999,
        spd: 999,
        attSpd: 0.3
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Heros';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [2]}
    }, {});
  }
};
