const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const heroesRouter = require('./heroes.js');
const monstersRouter = require('./monsters.js');
const battlesRouter = require('./battles.js');

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/heroes', heroesRouter);
router.use('/monsters', monstersRouter);
router.use('/battles', battlesRouter);


module.exports = router;
