import React, {Component} from 'react';

import { Line } from './chartjs';
import update from 'immutability-helper';
import randomColor from 'randomcolor';
import * as d3 from 'd3-interpolate';
import faker from 'faker';
import moment from 'moment';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FlatButton from 'material-ui/FlatButton';

const GetChart = (params)=>{
    const { baseName, average, spread, ticks, mainColor } = params;
    return class MyChart extends Component{
        constructor(props){
            super(props);
            this.state={
                sampleData: [[1,2,4,6,2,4],[2,4,3,1,2,4],[1,4,3,5,6,2],[1,2,4,5,3,4]],
                baseName,
                charts6Days: [],
                charts6Weeks: [],
                charts6Months: [],
                dataColors: [],
                dates6Days:[],
                dates6Weeks: [],
                dates6Months: [],
                selectedTimeFrame: '6Days',
                chartLabels6Days: [],
                chartLabels6Weeks: [],
                chartLabels6Months: [],
                data: [{
                    data:[2,4,5,3,4,2],
                    label:'4',
                    backgroundColor: randomColor({
                                        hue: 'orange'
                                    })
                }],
                dataSets: new Array(),
                labels: ["1am", "2am", "3am","4am", "5am", "6am"],
                counter: 0,
                gendata: {
                    average,
                    spread,
                    ticks
                },
                mainColor,
            };
    
        }    
        genDataSet( arr, name ){
            console.log('COLOR')
            const dataset = {
                data: arr,
                label: this.state.baseName + ': ' + name
            };
            return dataset;
        }
        componentDidMount(){
            // this.setState({interval:this.interval.bind(this)()});
            this.genData.bind(this)(this.state.gendata.average, this.state.gendata.spread, this.state.gendata.ticks);
            // generate dataset and load into this.state.data
            const genDataSet = this.genDataSet.bind(this)();
            this.genDates.bind(this)();
        }
        genColorName(exceptColor){
            const colorArray = [
                'orange',
                'red',
                'blue',
                'green',
                'white',
                'black',
                'purple',
                'pink',
                'brown',
                'yellow'
            ];
            while(true){
                const index = Math.ceil(Math.random() * (colorArray.length-1))
                const color = colorArray[index];
                if(color!==exceptColor){
                    return color;
                }
            }
        }
    
        genData(average, spread, ticks){
            const fakeName = faker.name.findName();
            const bgColor1 = randomColor({
                hue: this.genColorName.bind(this)(this.state.mainColor)
            });
            const bgColor2 =  this.state.mainColor
    
            if(ticks===0){ return; }
            const arrMonths = [];
            for(var i=0;i<ticks;i++){
                const result = Math.ceil((Math.random()-0.5) * spread) + average;
                arrMonths.push(result)
            }
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
    
            // store colors
            const backgroundColors = {
                gradient: [bgColor1, bgColor2],
                color: bgColor1
            }
            const packedBGColors = this.prepareItemForState(backgroundColors, 'dataColors');        
            this.setState({dataColors: packedBGColors});
        
            
        }
        genDates(){
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
            
            const dates6Days = this.prepareItemForState(dates6DaysArr, 'dates6Days');
            const dates6Weeks = this.prepareItemForState(dates6WeeksArr, 'dates6Weeks');
            const dates6Months = this.prepareItemForState(dates6MonthsArr, 'dates6Months');
            this.setState({dates6Days: dates6DaysArr, dates6Weeks: dates6WeeksArr, dates6Months:dates6MonthsArr});
            
        }
        prepareItemForState(newDaysData, accessDaysName){
            const days = this.state[accessDaysName];
            const packedDays = update(days,{$push: [newDaysData]});
            return packedDays;
        }
        render(){
            console.log('RENDER', this.state)
            if(this.state.counter===4){clearInterval(this.state.interval)};
            const disabled = this.state['charts'+this.state.selectedTimeFrame].length===0;
    
            return(
                <div className='grid-layout-bottom-display'>
                    <div  className='grid-layout-top-controls'>
                        <div>
                            <FloatingActionButton mini={true} style={{marginRight: 20}} onClick={()=>{this.handleAddButton.bind(this)()}}>
                                    <ContentAdd />
                            </FloatingActionButton>
                            <FloatingActionButton mini={true} secondary={true} style={{marginRight: 20}} onClick={()=>{this.handleRemoveButton.bind(this)()}}>
                                <ContentRemove />
                            </FloatingActionButton>
                        </div> 
                        <div>
                            <FlatButton label="6 Days"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Days')}} disabled={disabled} />
                            <FlatButton label="6 Weeks"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Weeks')}} disabled={disabled} />
                            <FlatButton label="6 Months"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Months')}} disabled={disabled} />
                        </div> 
                    </div>              
                    <div className="chart-display">
                        <Line data={this.functionalConstruction.bind(this)} options={{ responsive:true, height: '100%'}}/>
                    </div>
                </div>
            )
        }
        selectTimeFrame(selectedTimeFrame){
            this.setState({selectedTimeFrame})
        }
    
        handleAddButton(){
            this.genData.bind(this)(this.state.gendata.average, this.state.gendata.spread, this.state.gendata.ticks);
        }
    
        handleRemoveButton(){
            const {
                charts6Days, charts6Weeks, charts6Months,
                chartLabels6Days, chartLabels6Weeks, chartLabels6Months,
                dataSets,
            } = this.state;
    
            // chart data
            let temp = Object.assign([], charts6Days);
            temp.pop();
            this.setState({charts6Days: temp});
    
            temp = Object.assign([], charts6Weeks);
            temp.pop();
            this.setState({charts6Weeks: temp});
    
            temp = Object.assign([], charts6Months);
            temp.pop();
            this.setState({charts6Months: temp});
    
            
            
            // chart labels
            temp = Object.assign([], chartLabels6Days);
            temp.pop();
            this.setState({chartLabels6Days: temp});
    
            temp = Object.assign([], chartLabels6Weeks);
            temp.pop();
            this.setState({chartLabels6Weeks: temp});
    
            temp = Object.assign([], chartLabels6Months);
            temp.pop();
            this.setState({chartLabels6Months: temp});
    
            // dataSet
            temp = Object.assign([], dataSets);
            temp.pop();
            this.setState({dataSets: temp});
    
        }
        getData(chartName, i){
            const result = Object.assign([], this.state[chartName][i]);
            return result;
        }
        getDataLabel(name, i){
            const result = this.state[name][i].slice(0);
            return result;
        }
        getBackgroundColor(ctx, i){
            const gradient = ctx.createLinearGradient(0,0,50,500);
            const dataColor = this.state.dataColors[i];
            if(dataColor.gradient){
                dataColor.gradient.forEach( (color, i)=>{
                    gradient.addColorStop(i, color);
                })
                return gradient;
            }else{
                return dataColor.color;
            }
        }
        getDataSet(chartsName, ctx){
            const result = this.state.dataSets;
            result.forEach( (item, i)=>{
                item.data = this.getData.bind(this)('charts'+chartsName, i);
                item.label = this.getDataLabel.bind(this)('chartLabels'+chartsName, i)
                item.backgroundColor = this.getBackgroundColor.bind(this)(ctx, i);
            });
    
            return result;
        }
        getLabels(){
            const { selectedTimeFrame } = this.state;
            const name = 'dates' + selectedTimeFrame;
            const result = this.state[name];
            console.log('GETLABELS', result);
            return result;
        }
        functionalConstruction(canvas){
            const ctx = canvas.getContext("2d")
            const datasets = this.getDataSet.bind(this)(this.state.selectedTimeFrame, ctx);
            const result = {
                    labels: this.getLabels.bind(this)(),
                    datasets: datasets
            }
            return result;
        }
    
    }
    
}

export default GetChart;