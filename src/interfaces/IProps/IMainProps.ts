import { ICard } from '../ICard';

export interface IMainProps {
  onEditProfile: () => void,
  onAddPlace: () => void,
  cards: Array<ICard>,
  onCardClick: (card: ICard) => void,
  onEditAvatar: () => void,
  handleCardLike: (card: ICard) => void,
  handleCardDelete: (card: ICard) => void,
}
