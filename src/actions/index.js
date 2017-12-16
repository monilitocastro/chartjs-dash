import axios from 'axios';
import { SELECT_TAB, GET_MAPT, WAITING, TABS_FETCH_SUCCESS} from './types';

const basePath = 'http://localhost:3004';

// -----------------------------------------TABS-----------------------------------------
export function getTabs(groupName){
    return (dispatch)=>{
        dispatch({
            type: WAITING,
            waiting: true
        });

        axios.get(basePath + '/tabContexts?groupname=' + groupName)
            .then(
                (result)=>{
                    // console.log('result', result);
                    const tabContext = result.data[0];
                    dispatch({
                        type: WAITING,
                        waiting: false
                    })
                    return dispatch(tabsFetchSuccess(tabContext))
                }
            )
            .catch(console.error);
    };
}

export function tabsFetchSuccess(asideTabContext){
    // console.log('payload', payload)
    return {
        type: TABS_FETCH_SUCCESS,
        asideTabContext
    }
}

export function selectTab(groupName, selectedId){
    console.log('selectTab',groupName,selectedId)
    return {
        type: SELECT_TAB,
        groupName,
        selectedId
    }
}