import { combineReducers } from 'redux';
import userReducer from '../components/user/userSlice';

export default combineReducers({
  currentUser: userReducer,
});
