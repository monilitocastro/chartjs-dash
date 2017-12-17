import axios from 'axios';
import { SELECT_TAB, GET_MAPT, WAITING, TABS_FETCH_SUCCESS, HEART_RATE_CHART_FETCH_SUCCESS} from './types';

const basePathTemplateServer = 'http://localhost:3004';
const basePathDataServer = 'http://localhost:3005';

// -----------------------------------------TABS-----------------------------------------
export function getTabs(groupName){
    return (dispatch)=>{
        dispatch({
            type: WAITING,
            waiting: true
        });

        axios.get(basePathTemplateServer + '/tabContexts?groupname=' + groupName)
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

export function getHeartRate(timeFrameSelected){
    console.log('getHeartRate',timeFrameSelected);
    return (dispatch) => {
        dispatch({type: WAITING, waiting:true});

        axios.get(basePathDataServer + "/heartRates?since="+timeFrameSelected)
            .then( 
                (result)=>{
                    // console.log('result.data[0]',result)
                    const heartRateChartContext = { data: '' };
                    heartRateChartContext.data = result.data[0].payload;
                    dispatch({
                        type: WAITING,
                        waiting: false
                    })
                    return dispatch( heartRateChartFetchSuccess(heartRateChartContext));
                }
            ).catch(console.error);
    }
}

export function  heartRateChartFetchSuccess(heartRateChartContext){
    // console.log('heartRateChartContext',heartRateChartContext)
    return {
        type: HEART_RATE_CHART_FETCH_SUCCESS,
        heartRateChartContext
    }
}