const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');

const { User, Hero } = require('../../db/models');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const userHeroes = await Hero.findAll({
        where: { ownerId: userId }
    });

    //err handler
    if(!userHeroes.length) {
        return res.json({UserHeroes: []})
    };

    return res.json({UserHeroes: userHeroes})
});

router.post('/create', async (req, res) => {
    // const 
})

module.exports = router;
