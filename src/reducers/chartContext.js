import {HEART_RATE_CHART_FETCH_SUCCESS} from '../actions/types';

export function chartsReducers( state = {}, action ){
    switch(action.type){
        case HEART_RATE_CHART_FETCH_SUCCESS:
            return { ...state, heartRateChartContext: action.heartRateChartContext}
        default:
            return state;
    }
}