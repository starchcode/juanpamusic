import { combineReducers } from 'redux';
import contactServer from './contactServer';
import languageChangeReducer from './languageChangeReducer';

export default combineReducers({
    noReducer: ()=> 'This is data from reducer',
    serverResponse: contactServer,
    selectedLanguage: languageChangeReducer
})