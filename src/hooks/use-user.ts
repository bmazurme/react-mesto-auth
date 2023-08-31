import { useSelector } from 'react-redux';
import { userSelector } from '../store';

export default function useUser() {
  return useSelector(userSelector);
}
