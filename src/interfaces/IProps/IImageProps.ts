import { ICard } from "interfaces/ICard";

export interface IImageProps {
  onClose: () => void,
  card: ICard|null,
}
