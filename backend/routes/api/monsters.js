const express = require('express');
const router = express.Router();

const { Monster } = require('../../db/models');

router.get('/', async (req, res) => {
    const monsters = await Monster.findAll();

    if(!monsters.length) {
        return res.json({Monsters: []});
    };

    return res.json({monsters});
});

module.exports = router;
