import { combineReducers } from 'redux';
import {tabContextReducers as tabContexts} from './tabContext';
import {chartsReducers as chartContexts} from './chartContext';

const rootReducer = combineReducers({
    tabContexts,
    chartContexts
});

export default rootReducer;