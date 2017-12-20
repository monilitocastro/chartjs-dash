
import { ALL_VITAL_SIGNS_FETCHED, SELECT_TAB,  TABS_FETCH_SUCCESS} from './types';


// -----------------------------------------TABS-----------------------------------------
export function getTabs(groupName){
    const asideTabContext = {
                "groupName": "measurements_and_panels",
                "menuItems": [
                    {
                        "text": "VITAL SIGNS",
                        "id": "VITAL_SIGNS"
                    },
                    {
                        "text": "SLEEP STUDY",
                        "id": "SLEEP_STUDY"
                    }
                ]
            
            }
    
    return {
        type: TABS_FETCH_SUCCESS,
        asideTabContext
    }
}

export function selectTab(groupName, selectedId){
    return {
        type: SELECT_TAB,
        groupName,
        selectedId
    }
}



export function getAllVitalSigns(){
    // const vitalSigns= {"heartRates":[{"since":"6-days-ago","payload":[{"datetime":"12/16/2017","heartRate":68},{"datetime":"12/15/2017","heartRate":64},{"datetime":"12/14/2017","heartRate":67},{"datetime":"12/13/2017","heartRate":55},{"datetime":"12/12/2017","heartRate":65}]},{"since":"6-weeks-ago","payload":[{"datetime":"12/10/2017","heartRate":51},{"datetime":"12/03/2017","heartRate":66},{"datetime":"11/26/2017","heartRate":60},{"datetime":"11/19/2017","heartRate":64},{"datetime":"11/12/2017","heartRate":64}]},{"since":"6-months-ago","payload":[{"datetime":"11/17/2017","heartRate":51},{"datetime":"10/17/2017","heartRate":66},{"datetime":"09/17/2017","heartRate":66},{"datetime":"08/17/2017","heartRate":54},{"datetime":"07/17/2017","heartRate":51}]}],"bloodPressures":[{"since":"6-days-ago","payload":[{"datetime":"12/16/2017","diastolic":82,"systolic":129},{"datetime":"12/15/2017","diastolic":74,"systolic":130},{"datetime":"12/14/2017","diastolic":74,"systolic":129},{"datetime":"12/13/2017","diastolic":72,"systolic":121},{"datetime":"12/12/2017","diastolic":75,"systolic":117}]},{"since":"6-weeks-ago","payload":[{"datetime":"12/10/2017","diastolic":72,"systolic":131},{"datetime":"12/03/2017","diastolic":73,"systolic":132},{"datetime":"11/26/2017","diastolic":86,"systolic":117},{"datetime":"11/19/2017","diastolic":73,"systolic":125},{"datetime":"11/12/2017","diastolic":73,"systolic":117}]},{"since":"6-months-ago","payload":[{"datetime":"11/17/2017","diastolic":81,"systolic":112},{"datetime":"10/17/2017","diastolic":78,"systolic":118},{"datetime":"09/17/2017","diastolic":74,"systolic":121},{"datetime":"08/17/2017","diastolic":83,"systolic":111},{"datetime":"07/17/2017","diastolic":77,"systolic":121}]}],"bodyTemperatures":[{"since":"6-days-ago","payload":[{"datetime":"12/16/2017","bodyTemperature":98},{"datetime":"12/15/2017","bodyTemperature":97},{"datetime":"12/14/2017","bodyTemperature":96},{"datetime":"12/13/2017","bodyTemperature":98},{"datetime":"12/12/2017","bodyTemperature":98}]},{"since":"6-weeks-ago","payload":[{"datetime":"12/10/2017","bodyTemperature":98},{"datetime":"12/03/2017","bodyTemperature":97},{"datetime":"11/26/2017","bodyTemperature":100},{"datetime":"11/19/2017","bodyTemperature":98},{"datetime":"11/12/2017","bodyTemperature":98}]},{"since":"6-months-ago","payload":[{"datetime":"11/17/2017","bodyTemperature":98},{"datetime":"10/17/2017","bodyTemperature":98},{"datetime":"09/17/2017","bodyTemperature":98},{"datetime":"08/17/2017","bodyTemperature":97},{"datetime":"07/17/2017","bodyTemperature":99}]}],"respiratoryRates":[{"since":"6-days-ago","payload":[{"datetime":"12/16/2017","respiratoryRate":13},{"datetime":"12/15/2017","respiratoryRate":20},{"datetime":"12/14/2017","respiratoryRate":19},{"datetime":"12/13/2017","respiratoryRate":19},{"datetime":"12/12/2017","respiratoryRate":13}]},{"since":"6-weeks-ago","payload":[{"datetime":"12/10/2017","respiratoryRate":20},{"datetime":"12/03/2017","respiratoryRate":17},{"datetime":"11/26/2017","respiratoryRate":17},{"datetime":"11/19/2017","respiratoryRate":19},{"datetime":"11/12/2017","respiratoryRate":17}]},{"since":"6-months-ago","payload":[{"datetime":"11/17/2017","respiratoryRate":19},{"datetime":"10/17/2017","respiratoryRate":16},{"datetime":"09/17/2017","respiratoryRate":15},{"datetime":"08/17/2017","respiratoryRate":13},{"datetime":"07/17/2017","respiratoryRate":17}]}]};
    let heartRates={
        days: [64, 68, 78, 59, 80, 71],
        weeks: [85, 67, 74, 54, 55, 78],
        months: [95, 76, 58, 87, 65, 59]
    }
    
    let diastolicRates={
        days: [82, 76,87, 98, 78,56],
        weeks: [90, 65,90,78,87, 67],
        months: [78,85,78,90,76,67]
    }
    
    let systolicRates={
        days: [120, 111, 122, 100, 99, 129],
        weeks: [100, 122, 111, 99, 140, 110],
        months: [90, 99, 129, 130, 130, 120]
    }
    const dates = {
        days:["12/12/2017","12/13/2017","12/14/2017","12/15/2017","12/16/2017","12/17/2017"],
        weeks:[ "11/12/2017", "11/19/2017", "11/26/2017", "12/03/2017", "12/10/2017", "12/17/2017"],
        months: ["07/17/2017","08/17/2017","09/17/2017","10/17/2017","11/17/2017","12/17/2017"]
    }
    const vitalSigns = {
        heartRates, diastolicRates, systolicRates,dates
    };
    return {
        type: ALL_VITAL_SIGNS_FETCHED,
        vitalSigns
    };
}