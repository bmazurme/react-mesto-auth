import { IProps } from './IProps';

export interface IEditProfileProps extends IProps {
  info: User | null,
  onUpdateUser: (info: Record<string, string>) => void,
}
