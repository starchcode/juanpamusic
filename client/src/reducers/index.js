import { combineReducers } from 'redux';
import contactServer from './contactServer';
import adminData from './adminData';

import languageChangeReducer from './languageChangeReducer';

export default combineReducers({
    noReducer: ()=> 'This is data from reducer',
    serverResponse: contactServer,
    adminData: adminData,
    selectedLanguage: languageChangeReducer
})