import { combineReducers } from 'redux';
import core from '../modules/core/reducer';
import users from '../modules/users/reducer';
import children from '../modules/children/reducer';
import records from '../modules/records/reducer';

export default combineReducers({
    core,
    users,
    children,
    records,
});
