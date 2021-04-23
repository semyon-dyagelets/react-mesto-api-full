const router = require('express').Router();
const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateGetCards,
  validateDeleteCardById,
  validateCreateCard,
  validateLikeCard,
} = require('../middlewares/validations');

router.get('/', validateGetCards, getCards);
router.delete('/:cardId', validateDeleteCardById, deleteCardById);
router.post('/', validateCreateCard, createCard);
router.put('/:cardId/likes', validateLikeCard, likeCard);
router.delete('/:cardId/likes', validateLikeCard, dislikeCard);

module.exports = router;
