const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const User = require('../models/user');
const AlreadyExistsError = require('../errors/already-exists-error');
const AuthorizationError = require('../errors/authorization-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ServerError = require('../errors/server-error');

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        ),
      });
      // const token = jwt.sign(
      //   { _id: user._id },
      //   JWT_SECRET,
      //   { expiresIn: '7d' },
      // );
      // /res.cookie(
      //   'jwt',
      //   token, {
      //     httpOnly: true,
      //     sameSite: true,
      //     maxAge: 360000 * 24 * 7,
      //   },
      // )
      // .end();
    })
    .catch(() => {
      next(new AuthorizationError('Неверный пользователь или пароль'));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

const getUser = (req, res, next) => {
  const myId = req.user._id;
  User.findById(myId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name,
        about,
        avatar,
        email,
        password: hash,
      },
    ))
    .then((user) => res.status(201).send({ user: user.toJSON() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new AlreadyExistsError('Пользователь с таким email уже существует'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports = {
  login,
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
