/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';

import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors';

import Card from '../../models/card-model';
import { IUser } from '../../models/user-model';

const createCard = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const { name, link } = (req as Request).body;
    const card = await Card.create({ name, link, userId: (req as & { user: IUser}).user._id });

    return res.status(200).send(card);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('переданы некорректные данные в метод'));
    }

    return next(error);
  }
};

const deleteCard = async (req: unknown, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById((req as Request).params.id);

    if (!card) {
      return new NotFoundError('карточка не найдена');
    }

    if (!card.userId.equals((req as Request & { user: IUser}).user._id)) {
      return next(new ForbiddenError('access denied'));
    }

    await Card.deleteOne({ _id: (req as Request).params.id });

    return res.status(200).send({ message: 'карточка удалена' });
  } catch (err) {
    next(err);
  }
};

const getCards = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.clearCookie('token', { path: '/' }).send({ message: 'logout' });
  } catch (err) {
    next(err);
  }
};

const likeCard = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.clearCookie('token', { path: '/' }).send({ message: 'logout' });
  } catch (err) {
    next(err);
  }
};

const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.clearCookie('token', { path: '/' }).send({ message: 'logout' });
  } catch (err) {
    next(err);
  }
};

export {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
};
