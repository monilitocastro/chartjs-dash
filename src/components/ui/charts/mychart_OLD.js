import React, {Component} from 'react';
import { Line } from './chartjs';
import update from 'immutability-helper';
import randomColor from 'randomcolor';
import * as d3 from 'd3-interpolate';
import faker from 'faker';


import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FlatButton from 'material-ui/FlatButton';

class LineChart extends Component{
    constructor(props){
        super(props);
        this.state={
            sampleData: [[1,2,4,6,2,4],[2,4,3,1,2,4],[1,4,3,5,6,2],[1,2,4,5,3,4]],
            baseName: 'Body Temperature',
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
                average: 96.8,
                spread: 5,
                ticks: 6
            }
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
        console.log({genDataSet})
    }
    interval(){
        return setInterval(()=>{
            const orangey = randomColor({
                hue: 'orange'
            });
            const data = {
                data: this.state.sampleData[this.state.counter],
                label: this.state.counter,
                backgroundColor: orangey,
                lineColor: orangey
            };
            this.state.data.push(data); //update(oldData, {$push: this.state.sampleData[this.state.counter]})
            this.setState({counter: this.state.counter+1})
        }, 1000);
    }

    genData(average, spread, ticks){
        const fakeName = faker.name.findName();
        const bgColor1 = randomColor({
            hue: 'orange'
        });
        const bgColor2 =  randomColor({
            hue: 'purple'
        });

        if(ticks===0){ return; }
        const arrMonths = [];
        for(var i=0;i<ticks;i++){
            const result = Math.ceil((Math.random()-0.5) * spread) + average;
            arrMonths.push(result)
        }
        let arrMonthsDS = this.genDataSet.bind(this)(arrMonths, fakeName + ' (past 6 days)');
        console.log({arrMonthsDS});
        
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
        console.log({arrWeeksDS});

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
        console.log({arrDaysDS});

        // create new dataSet
        const dataSets = this.prepareItemForState({}, 'dataSets');
        this.setState({dataSets})
        
        // store dataset
        const packedChartsDays = this.prepareItemForState(arrDays,'charts6Days');        
        const packedChartsWeeks = this.prepareItemForState(arrWeeks,'charts6Weeks');
        const packedChartsMonths = this.prepareItemForState( arrMonths, 'charts6Months');
        console.log({packedChartsDays})
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
    prepareItemForState(newDaysData, accessDaysName){
        const days = this.state[accessDaysName];
        const packedDays = update(days,{$push: [newDaysData]});
        return packedDays;
    }
    prepareForState({newDaysData,newWeeksData,newMonthsData, accessDaysName, accessWeeksName, accessMonthsName}){
        const days = this.state[accessDaysName];
        const weeks = this.state[accessWeeksName];
        const months = this.state[accessMonthsName];

        const packedDays = update(days,{$push: [newDaysData]});

        const packedWeeks = update(weeks, {$push: [newWeeksData] });

        const packedMonths = update(months, {$push: [newMonthsData]});
        const result = {packedDays, packedWeeks, packedMonths};
        // console.log({result})
        return result;
    }
    render(){
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
                    <Line data={this.keepItFunctional.bind(this)} options={{ responsive:true, height: '100%'}}/>
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
    hexToRGB(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        console.log({hex})
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    getData(chartName, i){
        console.log('GETDATA', this.state)
        const result = Object.assign([], this.state[chartName][i]);
        return result;
    }
    getDataLabel(name, i){
        console.log('GETDATALABEL', this.state)
        const result = this.state[name][i].slice(0);
        // console.log('GETDATALABEL', result)
        return result;
    }
    getBackgroundColor(ctx, i){
        console.log('GETBACKGROUNDCOLOR', this.state);
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
        console.log('RESULT', result)
        result.forEach( (item, i)=>{
            item.data = this.getData.bind(this)('charts'+chartsName, i);
            item.label = this.getDataLabel.bind(this)('chartLabels'+chartsName, i)
            item.backgroundColor = this.getBackgroundColor.bind(this)(ctx, i);
        });

        console.log('GETDATASET', {result})
        return result;
    }
    keepItFunctional(canvas){
        const ctx = canvas.getContext("2d")
        console.log({canvas})
        const datasets = this.getDataSet.bind(this)(this.state.selectedTimeFrame, ctx);
        console.log({datasets})
        const result = {
                labels: this.state.labels,
                datasets: datasets//this.state['charts'+this.state.selectedTimeFrame]
        }
        console.log('KEEPITFUNCTIONAL', result);
        console.log({state:this.state})
        return result;
    }

}

export default LineChart;