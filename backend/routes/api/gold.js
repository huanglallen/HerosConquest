const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');

const { Gold } = require('../../db/models');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const userGold = await Gold.findOne({ where: { userId } });

    if(!userGold) {
        return res.json({ UserGold: 0 });
    };

    return res.json(userGold);
});

router.post('/create', async (req, res) => {
    const { amount } = req.body;

    const errors = {};
    if(!amount || amount < 0) errors.amount = "Gold must be a valid input";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    };

    const newGold = await Gold.create({
        userId: req.user.id,
        amount
    });
    return res.status(201).json(newGold);
});

router.put('/:userId', async (req, res) => {
    const { amount } = req.body;
    const { userId } = req.params;
    const gold = await Gold.findOne({ where: { userId } });

    const errors = {};
    if(!gold) return res.status(404).json({message: 'Gold cannot be found'});
    if(!amount || amount < 0) errors.amount = "Gold must be a valid input";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    };

    const updatedGold = {
        userId: req.user.id,
        amount
    };
    await gold.update(updatedGold);
    return res.json(gold);
});

module.exports = router;
