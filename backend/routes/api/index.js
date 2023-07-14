const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const heroesRouter = require('./heroes.js');

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/heroes', heroesRouter);

module.exports = router;
