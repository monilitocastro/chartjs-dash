
import randomColor from 'randomcolor';
import * as d3 from 'd3-interpolate';
import faker from 'faker';
import prepareItemForState from '../prepareitemforstate';

function genTimeSeriesData( average, spread, ticks){
    const fakeName = faker.name.findName();

    if(ticks===0){ return; }
    const arrMonths = [];
    for(var i=0;i<ticks;i++){
        const result = Math.ceil((Math.random()-0.5) * spread) + average;
        arrMonths.push(result)
    }
    
    const arrWeeks = [];
    let l = arrMonths[ticks-2], r = arrMonths[ticks-1];
    let interp = d3.interpolate(l, r);
    for(var i=0;i<ticks;i++){
        if(i===0) {
            arrWeeks.push(l);
            continue
        } 
        if(i===ticks-1) {
            arrWeeks.push(r);
            continue
        }
        let result = interp(i/ticks) + ((Math.random()-0.5) * (1/ticks) * spread);
        arrWeeks.push(result);
    }

    const arrDays = [];
    l = arrWeeks[ticks-2]; r = arrWeeks[ticks-1];
    interp = d3.interpolate(l, r);
    for(var i=0;i<ticks;i++){
        if(i===0) {
            arrDays.push(l);
            continue
        } 
        if(i===ticks-1) {
            arrDays.push(r);
            continue
        }
        let result = interp(i/ticks) + ((Math.random()-0.5) * (1/ticks) * spread);
        arrDays.push(result);
    }

    // create new dataSet
    const dataSets = prepareItemForState.bind(this)( {}, 'dataSets');
    this.setState({dataSets})
    
    // store dataset
    const packedChartsDays = prepareItemForState.bind(this)(arrDays,'charts6Days');        
    const packedChartsWeeks = prepareItemForState.bind(this)(arrWeeks,'charts6Weeks');
    const packedChartsMonths = prepareItemForState.bind(this)(arrMonths, 'charts6Months');
    //console.log({packedChartsDays})
    this.setState({charts6Days: packedChartsDays, charts6Weeks: packedChartsWeeks, charts6Months: packedChartsMonths});

    // store name
    const packed6DaysName = prepareItemForState.bind(this)(this.state.baseName + ": " + fakeName + " (6 days)", 'chartLabels6Days');
    const packed6WeeksName = prepareItemForState.bind(this)(this.state.baseName + ": " + fakeName + " (6 weeks)", 'chartLabels6Weeks');
    const packedMonthsName = prepareItemForState.bind(this)(this.state.baseName + ": " + fakeName + " (6 Months)", 'chartLabels6Months');
    this.setState({chartLabels6Days: packed6DaysName, chartLabels6Weeks: packed6WeeksName, chartLabels6Months: packedMonthsName});

    // genColors.bind(this).call(this);
    
}

export default genTimeSeriesData;