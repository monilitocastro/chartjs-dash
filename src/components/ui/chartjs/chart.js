import React, {Component} from 'react';
import update from 'immutability-helper';

import moment from 'moment';
import * as d3 from 'd3-interpolate';

//import chartjs
import { Line } from 'react-chartjs-2';

// material ui
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';


class Chart extends Component{
    constructor(props){
        super(props);
        this.state={
            chartType: 'Line',
            charts6Days: [],
            charts6Weeks: [],
            charts6Months: [],
            dates6Days:[],
            dates6Weeks: [],
            dates6Months: [],
            selectedTimeFrame: 'charts6Days',
            average: 90,
            spread: 10
        };
    }
    componentWillMount(){
        this.generateDates.bind(this)();
    }
    render(){
        console.log("RENDER", this.state);
        const style = {
            marginRight: 20,
        };
        const { chartType, charts6Days } = this.state;
        const disabled = (charts6Days.length===0);
        const Component = <Line />;
        if(chartType==='Line'){
            return(
                <div className='chart-lab'>
                    <div>
                        <Line options={{maintainAspectRatio: false}} />
                    </div>
                    <div>
                        <FlatButton label="6 Days"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('charts6Days')}} disabled={disabled} />
                        <FlatButton label="6 Weeks"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('charts6Weeks')}} disabled={disabled} />
                        <FlatButton label="6 Months"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('charts6Months')}} disabled={disabled} />
                    </div>
                    <div>
                        <FloatingActionButton mini={true} style={style} onClick={()=>{this.addContent.bind(this)()}}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <FloatingActionButton mini={true} secondary={true} style={style} onClick={()=>{this.removeContent.bind(this)()}}>
                            <ContentRemove />
                        </FloatingActionButton>
                    </div>
                    <div></div>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }


    addContent(){
        const sixMonthValues = [];
        for(var i=0;i<6;i++){
            const g = this.generateValue.bind(this)(this.state.average, this.state.spread);
            sixMonthValues.push(g);
        }
        let l = sixMonthValues[sixMonthValues.length-2];
        let r = sixMonthValues[sixMonthValues.length-1];
        // interpolate for sixWeekValues
        const sixWeekValues = [];
        for(var i=0;i<6;i++){
            var d = d3.interpolate(l, r);
            const step = 1 / 6 + i;
            const average = d(step);
            const spread = 0.2 * l;
            const g = this.generateValue.bind(this)(average, spread);
            sixWeekValues.push(g);
        }

        l = sixWeekValues[sixMonthValues.length-2];
        r = sixWeekValues[sixMonthValues.length-1];
        // interpolate for sixWeekValues
        const sixDayValues = [];
        for(var i=0;i<6;i++){
            var d = d3.interpolate(l, r);
            const step = 1 / 6 + i;
            const average = d(step);
            const spread = 0.2 * l;
            const g = this.generateValue.bind(this)(average, spread);
            sixDayValues.push(g);
        }

        const { charts6Days, charts6Weeks, charts6Months } = this.state;
        const sixDayWrapped = [sixDayValues];
        const charts6DaysResults = update(sixDayWrapped , {$push: charts6Days});
        this.setState({charts6Days: charts6DaysResults});
        
        const sixWeekWrapped = [sixWeekValues];
        const charts6WeeksResults = update(sixWeekWrapped , {$push: charts6Weeks});
        this.setState({charts6Weeks: charts6WeeksResults});
        
        const sixMonthsWrapped = [sixMonthValues];
        const charts6MonthsResults = update(sixMonthsWrapped , {$push: charts6Months});
        this.setState({charts6Months: charts6MonthsResults});
    }

    removeContent(){
        if(this.state.charts6Days.length<=0){
            return;
        }
        const charts6Days = Object.assign([], this.state.charts6Days);
        charts6Days.pop();
        this.setState({charts6Days});
        
        if(this.state.charts6Weeks.length<=0){
            return;
        }
        const charts6Weeks = Object.assign([], this.state.charts6Weeks);
        charts6Weeks.pop();
        this.setState({charts6Weeks});

        if(this.state.charts6Days.length<=0){
            return;
        }
        const charts6Months = Object.assign([], this.state.charts6Months);
        charts6Months.pop();
        this.setState({charts6Months});
    }

    generateDates(){
        let days = moment();
        let weeks = moment();
        let months = moment();
        days.hour(12).minute(0).second(0);
        weeks.hour(12).minute(0).second(0);
        months.hour(12).minute(0).second(0);
        const dates6Days = [], dates6Weeks = [], dates6Months=[]
        for(var i=0; i<6;i++){
            const daysResult  =  days.subtract(1, 'days').format('MM/DD/YYYY');
            const weeksResult  = weeks.subtract(1, 'weeks').format('MM/DD/YYYY');
            const monthsResult  = months.subtract(1, 'months').format('MM/DD/YYYY');
            dates6Days.push(daysResult);
            dates6Weeks.push(weeksResult);
            dates6Months.push(monthsResult);
            console.log(daysResult.toString())
        }
        this.setState({dates6Days});
        this.setState({dates6Weeks});
        this.setState({dates6Months});
    }

    selectTimeFrame(t){
        const selectedTimeFrame = Object.assign("",t);
        this.setState({selectedTimeFrame})
    }

    generateValue(average, spread){
        let dif = (Math.random() - 0.5) * spread;
        return average + dif;
    }
}

export default Chart;