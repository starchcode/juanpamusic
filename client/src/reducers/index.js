import { combineReducers } from 'redux';
import {sendEmail} from './sendEmail';
import {adminData} from './adminData';
import {iglinksdata} from './iglinksdata';
import {languageChangeReducer} from './languageChangeReducer';

export default combineReducers({
    contact: sendEmail,
    adminData: adminData,
    iglinksdata: iglinksdata,
    selectedLanguage: languageChangeReducer
})