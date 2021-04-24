const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: (value) => isEmail(value),
        message: 'Неверный формат почты',
      }],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: false,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    validate: [
      {
        validator: (url) => isURL(url, {
          protocols: ['http', 'https'],
          require_protocol: true,
        }),
        message: 'Неверный формат ссылки',
      },
    ],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неверный пользователь или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неверный пользователь или пароль'));
          }
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);
