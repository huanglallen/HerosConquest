const express = require('express');
const router = express.Router();

const { Battle } = require('../../db/models');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const battle = await Battle.findOne({
        where: { userId: userId }
    });

    if(!battle) return res.json({battle: {}});

    return res.json({battle});
});

router.post('/create', async (req, res) => {
    const { userId, heroId, monsterId, heroHp, monsterHp } = req.body;

    const errors = {};
    if(!userId) errors.userId = "userId required";
    if(!heroId) errors.heroId = "heroId required";
    if(!monsterId) errors.monsterId = "monsterId required";
    if(!heroHp) errors.heroHp = "heroHp required";
    if(!monsterHp) errors.monsterHp = "monsterHp required";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    };

    const newBattle = await Battle.create({
        userId,
        heroId,
        monsterId,
        heroHp,
        monsterHp
    });
    return res.status(201).json(newBattle);
});

router.put('/fight/:battleId', async (req, res) => {
    const { heroId, monsterId, heroHp, monsterHp } = req.body;
    const { battleId } = req.params;
    const battle = await Battle.findByPk(battleId);

    if(!battle) {
        return res.status(404).json({ message: "Battle couldn't be found" });
    };

    const updatedBattle = {
        heroId,
        monsterId,
        heroHp,
        monsterHp
    };
    await battle.update(updatedBattle);
    return res.json(battle);
});

router.delete('/:battleId', async (req, res) => {
    const { battleId } = req.params;
    const battle = await Battle.findByPk(battleId);

    if(!battle) {
        return res.status(404).json({ message: "No battle found"});
    };

    await battle.destroy();
    return res.json({ message: "Successfully deleted" });
});

module.exports = router;
