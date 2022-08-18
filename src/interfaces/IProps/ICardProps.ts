import { ICard } from '../ICard';

export interface ICardProps {
  card: ICard,
  onCardDelete: (card: ICard) => void,
  onCardLike: (card: ICard) => void,
  onCardClick: (card: ICard) => void,
}
