import { combineReducers } from 'redux';
import matchesStore from './matchesReducer';
import user from './userReducer';

export default combineReducers({ matchesStore, user });
