import { ILike } from './ILike';
import { IUser } from './IUser';

export interface ICard {
  _id: number,
  name: string,
  link: string,
  likes: Array<ILike>,
  owner: IUser,
  createdAt: Date
}
