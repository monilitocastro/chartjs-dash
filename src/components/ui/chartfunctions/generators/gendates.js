
import moment from 'moment';
import prepareItemForState from '../prepareitemforstate';

function genDates(){
    const { ticks } = this.state.gendata;
    const dateDays = moment();
    const dateWeeks = moment();
    const dateMonths = moment();
    dateDays.hour(12).minute(0).second(0);
    dateWeeks.hour(12).minute(0).second(0);
    dateMonths.hour(12).minute(0).second(0);
    const dates6DaysArr = [], dates6WeeksArr = [], dates6MonthsArr = [];
    for(var i=0;i<ticks;i++){
        dates6DaysArr.unshift(dateDays.format('ddd, MMM DD, YYYY'))
        dates6WeeksArr.unshift(dateWeeks.format('ddd, MMM DD, YYYY'))
        dates6MonthsArr.unshift(dateMonths.format('ddd, MMM DD, YYYY'))
        dateDays.subtract(1, 'day');
        dateWeeks.subtract(1, 'week');
        dateMonths.subtract(1, 'month');
    }
    console.log('GENDATES', dates6DaysArr, dates6WeeksArr, dates6MonthsArr)
    
    // const dates6Days = prepareItemForState.bind(this)(dates6DaysArr, 'dates6Days');
    // const dates6Weeks = prepareItemForState.bind(this)(dates6WeeksArr, 'dates6Weeks');
    // const dates6Months = prepareItemForState.bind(this)(dates6MonthsArr, 'dates6Months');
    this.setState({dates6Days: dates6DaysArr, dates6Weeks: dates6WeeksArr, dates6Months:dates6MonthsArr});
    
}

export default genDates;