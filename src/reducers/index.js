import { combineReducers } from 'redux';
import {tabContextReducers as tabContexts} from './tabContext';

const rootReducer = combineReducers({
    tabContexts
});

export default rootReducer;