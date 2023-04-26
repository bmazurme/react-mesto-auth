import { IProps } from './i-props';

export interface IEditProfileProps extends IProps {
  info: User | null,
  onUpdateUser: (info: Record<string, string>) => void,
}
