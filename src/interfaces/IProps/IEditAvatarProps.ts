import { IProps } from './IProps';

export interface IEditAvatarProps extends IProps {
  onUpdateAvatar: (data: Record<string, string>) => void,
}
