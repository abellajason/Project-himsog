import { combineReducers } from 'redux';
import core from '../modules/core/reducer';
import users from '../modules/users/reducer';

export default combineReducers({
    core,
    users
});
