import { combineReducers } from 'redux';
import matches from './matchesReducer';
import user from './userReducer';

export default combineReducers({ matches, user });
