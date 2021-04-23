const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateGetUser,
  validateGetUserById,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', validateGetUser, getUser);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
