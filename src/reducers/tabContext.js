import {SELECT_TAB, GET_MAPT, TABS_FETCH_SUCCESS, WAITING } from '../actions/types';

export function tabContextReducers( state = {}, action ){
    switch(action.type){
        case GET_MAPT:
            return { ...state, payload: action.payload}
        case TABS_FETCH_SUCCESS:
            return { ...state, asideTabContext: action.asideTabContext }
        case SELECT_TAB:
        console.log('selectedid', action.selectedId)
            return { ...state, groupName: action.groupName, selectedId: action.selectedId}
        default:
            return state;
    }
}