import {ALL_VITAL_SIGNS_FETCHED, HEART_RATE_CHART_FETCH_SUCCESS} from '../actions/types';

export function chartsReducers( state = {}, action ){
    switch(action.type){
        case HEART_RATE_CHART_FETCH_SUCCESS:
            return { ...state, heartRateChartContext: action.heartRateChartContext}
        case ALL_VITAL_SIGNS_FETCHED:
            return { ...state, vitalSigns: action.vitalSigns}
        default:
            return state;
    }
}