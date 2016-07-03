import { createAction } from 'redux-actions';
import Language from './../utils/Language';

export const getLanguageList = createAction('GET_LANGUAGE_LIST', Language.getLanguageList);

