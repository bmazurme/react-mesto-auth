import { ICard } from '../ICard';

export interface IImageProps {
  onClose: () => void,
  card: ICard|null,
}
