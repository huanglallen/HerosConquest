const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');

const { Gold } = require('../../db/models');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const userGold = await Gold.findOne()

});

module.exports = router;
