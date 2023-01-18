import { ICard } from '../ICard';

export interface IMainProps {
  path: string,
  isLoggedIn: boolean,
  onEditAvatar: any,
  onEditProfile: any,
  onAddPlace: (data: Record<string, string>) => void,
  onCardClick: (card: ICard) => void,
  handleCardLike: (card: ICard) => void,
  handleCardDelete: (card: ICard) => void,
  cards: Array<ICard>,
  component: any,
  isLoading: boolean,
}
