/* eslint-disable no-undef */
import { ILike } from './ILike';

export interface ICard {
  _id: string,
  name: string,
  link: string,
  likes: Array<ILike>,
  owner: User | null,
  createdAt: Date
}
