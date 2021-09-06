import { combineReducers } from 'redux';
import contactServer from './contactServer';

export default combineReducers({
    noReducer: ()=> 'This is data from reducer',
    serverResponse: contactServer
})