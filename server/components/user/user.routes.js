const router = require('express').Router();
const { signup, signin } = require('./user.controller');

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;