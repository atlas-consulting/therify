import { combineReducers } from 'redux';
import matchesReducer from './matchesReducer';
import usersReducer from './userReducer';

export default combineReducers({ matchesReducer, usersReducer });
