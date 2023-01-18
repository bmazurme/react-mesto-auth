/* eslint-disable no-undef */
import { ICard } from '../ICard';

export interface ICardProps {
  user: User | null;
  card: ICard,
  onCardLike: (card: ICard) => void,
  onCardClick: (card: ICard) => void,
}
