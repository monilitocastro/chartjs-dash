import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import update from 'immutability-helper';

import moment from 'moment';
import * as d3 from 'd3-interpolate';

//import chartjs
import { Chart, Line } from 'react-chartjs-2';

// material ui
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';


class ReactChart extends Component{
    constructor(props){
        super(props);
        this.chart = new Chart(ctx, config);
        this.state={
            chartType: 'Line',
            charts6Days: [],
            charts6Weeks: [],
            charts6Months: [],
            dates6Days:[],
            dates6Weeks: [],
            dates6Months: [],
            selectedTimeFrame: '6Days',
            average: 90,
            spread: 10,
            chart: {
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [{
                    label: 'test',
                    data: [1,2,3,4,5,6]
                },
                {
                    label: 'test2',
                    data: [6,5,4,3,2,1]
                }
                ]
            },
            chartObject: {}
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
        const { chartType, chart } = this.state;
        const disabled = (chart.datasets.length===0);
        if(chartType==='Line'){
            console.log('CHART', chart)
            return(
                <div className='chart-lab'>
                    <div>
                        <Line data={chart} options={{maintainAspectRatio: false, scales: {
                            xAxes: [{ stacked: true }],
                            yAxes: [{ stacked: true }]
                        }}} ref='CustomChart'/>
                    </div>
                    <div>
                        <FlatButton label="6 Days"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Days')}} disabled={disabled} />
                        <FlatButton label="6 Weeks"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Weeks')}} disabled={disabled} />
                        <FlatButton label="6 Months"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Months')}} disabled={disabled} />
                    </div>
                    <div>
                        <FloatingActionButton mini={true} style={style} onClick={()=>{this.handleAddButton.bind(this)()}}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <FloatingActionButton mini={true} secondary={true} style={style} onClick={()=>{this.handleRemoveButton.bind(this)()}}>
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
    handleAddButton(){
        const { selectedTimeFrame } = this.state;
        this.addContent.bind(this)(( names )=>{
            const { fullName, partName } = names;
            if(!fullName || !partName){
                console.error('Need full name and part name when invoking afterUpdateCallback')
                return
            }
            console.log('===', selectedTimeFrame, partName)
            if(selectedTimeFrame !== partName){
                return
            }
            const arr = this.state[fullName];
            const newArr = Object.assign([], arr);
            const index = newArr.length - 1;

            // forgive me my reactjs overlords
            const addThis = this.getChartProperties.bind(this)(newArr)
            this.state.chart.datasets.push(addThis);
            this.state.chart.labels.pop();
            this.state.chart.labels.push(this.state['dates'+partName]);
            const CustomChart = findDOMNode(this.refs.CustomChart);
            this.forceUpdate();
        });
        

    }
    addContent(afterUpdateCallback){
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

        let { charts6Days, charts6Weeks, charts6Months } = this.state;
        const newObj = JSON.parse(JSON.stringify( { charts6Days, charts6Weeks, charts6Months } ));
        charts6Days = newObj.charts6Days;
        charts6Weeks = newObj.charts6Weeks;
        charts6Months = newObj.charts6Months;
        const sixDayWrapped = [sixDayValues];

        console.log('sixDayWrapped',JSON.stringify(sixDayWrapped));
        const charts6DaysResults = update(sixDayWrapped , {$push: charts6Days});
        console.log('charts6DaysResults',JSON.stringify(charts6DaysResults));
        // const charts6DaysResults = Object.assign(sixDayWrapped, charts6Days);
        this.setState({charts6Days: charts6DaysResults}, ()=>{ afterUpdateCallback({
            fullName:'charts6Days',
            partName: '6Days'
        })});
        
        const sixWeekWrapped = [sixWeekValues];
        const charts6WeeksResults = update(sixWeekWrapped , {$push: charts6Weeks});
        this.setState({charts6Weeks: charts6WeeksResults }, ()=>{ afterUpdateCallback({
            fullName:'charts6Weeks',
            partName: '6Weeks'
        })});
        
        const sixMonthsWrapped = [sixMonthValues];
        const charts6MonthsResults = update(sixMonthsWrapped , {$push: charts6Months});
        this.setState({charts6Months: charts6MonthsResults}, ()=>{ afterUpdateCallback({
            fullName:'charts6Months',
            partName: '6Months'
        })});
    }
    handleRemoveButton(){
        console.error('REMOVE NOT IMPLEMENTED');
    }


    generateChart_OLD(){
        const chartName = 'charts'+this.state.selectedTimeFrame;
        const dateName = 'dates'+this.state.selectedTimeFrame;
        const labels = this.state[dateName];
        const datasets = this.state[chartName].map((arr)=>{
            let result = {
                label: 'Heart Rate',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: Object.assign([], arr)
            }
            return result;
        })
        console.log(JSON.stringify({labels, datasets}))
        return Object.assign({}, {labels, datasets: Object.assign([],datasets) });
    }



    addContent_OLD(){
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

        let { charts6Days, charts6Weeks, charts6Months } = this.state;
        const newObj = JSON.parse(JSON.stringify( { charts6Days, charts6Weeks, charts6Months } ));
        charts6Days = newObj.charts6Days;
        charts6Weeks = newObj.charts6Weeks;
        charts6Months = newObj.charts6Months;
        const sixDayWrapped = [sixDayValues];

        console.log('sixDayWrapped',JSON.stringify(sixDayWrapped));
        const charts6DaysResults = update(sixDayWrapped , {$push: charts6Days});
        console.log('charts6DaysResults',JSON.stringify(charts6DaysResults));
        // const charts6DaysResults = Object.assign(sixDayWrapped, charts6Days);
        this.setState({charts6Days: charts6DaysResults});
        
        const sixWeekWrapped = [sixWeekValues];
        const charts6WeeksResults = update(sixWeekWrapped , {$push: charts6Weeks});
        this.setState({charts6Weeks: charts6WeeksResults});
        
        const sixMonthsWrapped = [sixMonthValues];
        const charts6MonthsResults = update(sixMonthsWrapped , {$push: charts6Months});
        this.setState({charts6Months: charts6MonthsResults});
    }


    getChartProperties(data){
        let num = 1;
        num = this.state.chart.datasets.length + 1;
        return {
            label: 'Set ' + num,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data
        }
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
            dates6Days.unshift(daysResult);
            dates6Weeks.unshift(weeksResult);
            dates6Months.unshift(monthsResult);
            console.log(daysResult.toString())
        }
        this.setState({dates6Days});
        this.setState({dates6Weeks});
        this.setState({dates6Months});
    }

    selectTimeFrame(selectedTimeFrame){
        this.setState({selectedTimeFrame})
    }

    generateValue(average, spread){
        let dif = (Math.random() - 0.5) * spread;
        return average + dif;
    }
}

export default ReactChart;