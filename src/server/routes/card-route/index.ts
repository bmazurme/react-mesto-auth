import { Router } from 'express';

import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} from '../../controllers/card-controller';
import { validateCardData, validateObjectId } from '../../utils/validator';
import { UrlsApi } from '../../utils/routers';

const router = Router();

router.post(UrlsApi.CARDS.INDEX, validateCardData, createCard);
router.get(UrlsApi.CARDS.INDEX, getCards);
router.delete(UrlsApi.CARDS.ID, validateObjectId, deleteCard);
router.put(UrlsApi.CARDS.LIKES, validateObjectId, likeCard);
router.delete(UrlsApi.CARDS.LIKES, validateObjectId, dislikeCard);

export default router;
