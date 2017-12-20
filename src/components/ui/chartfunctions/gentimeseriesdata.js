
import randomColor from 'randomcolor';
import * as d3 from 'd3-interpolate';
import faker from 'faker';

function genTimeSeriesData( average, spread, ticks){
    const fakeName = faker.name.findName();

    if(ticks===0){ return; }
    const arrMonths = [];
    for(var i=0;i<ticks;i++){
        const result = Math.ceil((Math.random()-0.5) * spread) + average;
        arrMonths.push(result)
    }
    console.log('THIS', this);
    let arrMonthsDS = this.genDataSet.bind(this)(arrMonths, fakeName + ' (past 6 days)');
    //console.log({arrMonthsDS});
    
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
    let arrWeeksDS = this.genDataSet.bind(this)(arrWeeks, fakeName+ ' (past 6 weeks)');
    //console.log({arrWeeksDS});

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
    let arrDaysDS = this.genDataSet.bind(this)(arrDays, fakeName + ' (past 6 months)');
    //console.log({arrDaysDS});

    // create new dataSet
    const dataSets = this.prepareItemForState({}, 'dataSets');
    this.setState({dataSets})
    
    // store dataset
    const packedChartsDays = this.prepareItemForState(arrDays,'charts6Days');        
    const packedChartsWeeks = this.prepareItemForState(arrWeeks,'charts6Weeks');
    const packedChartsMonths = this.prepareItemForState( arrMonths, 'charts6Months');
    //console.log({packedChartsDays})
    this.setState({charts6Days: packedChartsDays, charts6Weeks: packedChartsWeeks, charts6Months: packedChartsMonths});

    // store name
    const packed6DaysName = this.prepareItemForState(this.state.baseName + ": " + fakeName + " (6 days)", 'chartLabels6Days');
    const packed6WeeksName = this.prepareItemForState(this.state.baseName + ": " + fakeName + " (6 weeks)", 'chartLabels6Weeks');
    const packedMonthssName = this.prepareItemForState(this.state.baseName + ": " + fakeName + " (6 Months)", 'chartLabels6Months');
    this.setState({chartLabels6Days: packed6DaysName, chartLabels6Weeks: packed6WeeksName, chartLabels6Months: packedMonthssName});

    this.genColors.bind(this)();
    
}

export default genTimeSeriesData;