import { combineReducers } from 'redux';
import {sendEmail} from './sendEmail';
import {adminData} from './adminData';
import {languageChangeReducer} from './languageChangeReducer';

export default combineReducers({
    contact: sendEmail,
    adminData: adminData,
    selectedLanguage: languageChangeReducer
})