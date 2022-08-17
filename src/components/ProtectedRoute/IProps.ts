import { ICard } from '../../interfaces/ICard';

export interface IProps {
  exact: boolean,
  path: string,
  isLoggedIn: boolean,
  component: any,
  isLoading: boolean,
  cards: ICard[],
  onEditAvatar: () => void,
  onEditProfile: () => void,
  onAddPlace: () => void,
  onCardClick: (card: ICard) => void,
  handleCardLike: (card: ICard) => void,
  handleCardDelete: (card: ICard) => void,
}
