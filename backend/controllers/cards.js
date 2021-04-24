const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ServerError = require('../errors/server-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new ServerError('Произошла ошибка')));
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Можно удалять только свои карточки');
      }
      Card.findByIdAndRemove(cardId)
        .orFail(() => {
          throw new NotFoundError('Карточка с указанным _id не найдена');
        })
        .then((card) => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else if (err.statusCode === 403) {
        next(new ForbiddenError('Можно удалять только свои карточки'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Карточка с указанным _id не найдена');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятия лайка' });
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      next(new ServerError('Произошла ошибка'));
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Карточка с указанным _id не найдена');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      next(new ServerError('Произошла ошибка'));
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
