const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');

const { Hero, Playing } = require('../../db/models');

router.get('/playing/:userId', async (req, res) => {
    const { userId } = req.params;
    const playingHero = await Playing.findOne({
        where: { userId: userId }
    });
    if(!playingHero) return res.json({Playing: []});

    return res.json({playingHero});
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const userHeroes = await Hero.findAll({
        where: { ownerId: userId }
    });

    //err handler
    if(!userHeroes.length) {
        return res.json({UserHeroes: []});
    };

    return res.json({userHeroes})
});

router.post('/create', async (req, res) => {
    const { name, heroClass, level, xp, hp, att, def, spd, attSpd } = req.body;

    //err handler
    const errors = {}
    if(!name) errors.name = "Name is required";
    if(name.length > 12) errors.name = "Name cannot be more than 12 characters long";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    }

    const newHero = await Hero.create({
        ownerId: req.user.id,
        name,
        heroClass,
        level,
        xp,
        hp,
        att,
        def,
        spd,
        attSpd
    });
    return res.status(201).json(newHero)
});

router.post('/playing', async (req, res) => {
    const { userId, heroId } = req.body;

    const errors = {};
    if(!heroId) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    };

    const newPlaying = await Playing.create({userId, heroId});
    return res.status(201).json(newPlaying);
});

router.put('/:heroId', async (req, res) => {
    const { name, heroClass, level, xp, hp, att, def, spd, attSpd } = req.body;
    const { heroId } = req.params;
    const hero = await Hero.findByPk(heroId);
    const errors = {};

    //error handler
    if(!hero) {
        return res.status(404).json({message: "Hero couldn't be found"});
    };
    if(!name) errors.name = "Name is required";
    if(name.length > 12) errors.name = "Name cannot be more than 12 characters long";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
            message: "Bad Request",
            errors
        });
    };

    const updatedHero = {
        ownerId: req.user.id,
        name,
        heroClass,
        level,
        xp,
        hp,
        att,
        def,
        spd,
        attSpd
    };
    await hero.update(updatedHero);
    return res.json(hero)
});

router.delete('/playing/:heroId', async (req, res) => {
    const { heroId } = req.params;
    const playing = await Playing.findByPk(heroId);

    if(!playing) {
        return res.status(404).json({message: "No hero is currently being played"});
    };

    await playing.destroy();
    return res.json({ message: "Successfully deleted" });
})

router.delete('/:heroId', async (req, res) => {
    const { heroId } = req.params;
    const hero = await Hero.findByPk(heroId);

    //error handler
    if(!hero) {
        return res.status(404).json({message: "Hero couldn't be found"});
    };

    await hero.destroy();
    return res.json({ message: "Successfully deleted" });
});

module.exports = router;
