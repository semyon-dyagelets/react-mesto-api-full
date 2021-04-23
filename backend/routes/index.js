const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Ресурс по указанному маршруту не найден'));
});

module.exports = router;
