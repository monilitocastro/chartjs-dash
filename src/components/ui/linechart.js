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
    genDataSet_OLD( arr, name, color ){
        console.log('COLOR', color)
        const dataset = {
            data: arr,
            label: this.state.baseName + ' ' + name,
            backgroundColor: color,
            fill: true
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
    genData_OLD(average, spread, ticks){
        const fakeName = faker.name.findName();
        const color = randomColor({
            hue: 'orange'
        });
        if(ticks===0){ return; }
        const arrMonths = [];
        for(var i=0;i<ticks;i++){
            const result = Math.ceil((Math.random()-0.5) * spread) + average;
            arrMonths.push(result)
        }
        let arrMonthsDS = this.genDataSet.bind(this)(arrMonths, fakeName + ' (past 6 days)', color);
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
        let arrWeeksDS = this.genDataSet.bind(this)(arrWeeks, fakeName+ ' (past 6 weeks)', color);
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
        let arrDaysDS = this.genDataSet.bind(this)(arrDays, fakeName + ' (past 6 months)', color);
        console.log({arrDaysDS});
        
        const {charts6Days, charts6Weeks, charts6Months} = this.state;
        let temp = Object.assign([], charts6Days);
        console.log({arrDays})
        temp = update(charts6Days,{$push: [arrDaysDS]});
        this.setState({charts6Days: temp});

        temp = update(charts6Weeks, {$push: [arrWeeksDS] });
        this.setState({charts6Weeks: temp});

        temp = update(charts6Months, {$push: [arrMonthsDS]});
        this.setState({charts6Months: temp});
        
    }
    render(){
        if(this.state.counter===4){clearInterval(this.state.interval)};
        const disabled = this.state['charts'+this.state.selectedTimeFrame].length===0;

        return(
            <div>
                <div>
                    <Line data={this.keepItFunctional.bind(this)} />
                </div>
                <div>
                    <FlatButton label="6 Days"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Days')}} disabled={disabled} />
                    <FlatButton label="6 Weeks"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Weeks')}} disabled={disabled} />
                    <FlatButton label="6 Months"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Months')}} disabled={disabled} />
                </div>
                <div>
                    <FloatingActionButton mini={true} style={{marginRight: 20}} onClick={()=>{this.handleAddButton.bind(this)()}}>
                            <ContentAdd />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} secondary={true} style={{marginRight: 20}} onClick={()=>{this.handleRemoveButton.bind(this)()}}>
                        <ContentRemove />
                    </FloatingActionButton>
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
        const {charts6Days, charts6Weeks, charts6Months} = this.state;

        let temp = Object.assign([], charts6Days);
        temp.pop();
        this.setState({charts6Days: temp});

        temp = Object.assign([], charts6Weeks);
        temp.pop();
        this.setState({charts6Weeks: temp});

        temp = Object.assign([], charts6Months);
        temp.pop();
        this.setState({charts6Months: temp});

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
    getData_OLD(){
        console.log('GENDATA', this.state)
        const result = this.state['charts' + this.state.selectedTimeFrame];
        return result;
    }
    getData(chartName, i){
        console.log('GETDATA', this.state)
        const result = Object.assign([], this.state[chartName][i]);
        return result;
    }
    getDataSet_ALT1(chartsName, ctx){
        let dataSetResult = this.state[chartsName];
        console.log('GETDATASET', {dataSetResult})
        const result = this.state.dataSets;
        const dataColors = this.state.dataColors;
        console.log('DATACOLORS')
        console.log(dataColors)
        if(dataSetResult.length===0){
            return [];
        }
        if(dataColors.length!==dataSetResult.length){
            console.log('Warning: dataColors and '+ chartsName + ' must match length')
        }
        
        for(var i=0,dclen=dataColors.length; i<dclen;i++){  
            console.log('EACH DATACOLOR',i, ' = ', dataColors[i]);
            // result.push({
            //     backgroundColor: ''
            // });      
            // // rules for how to apply background color schemes
            // if(dataColors[i].gradient){
            //     const gradient = ctx.createLinearGradient(0,0,0, 600);
            //     for(var j=0, glen=dataColors[i].gradient.length;j<glen;j++){
            //         gradient.addColorStop(j, dataColors[i].gradient[j]);
            //     }
            //     result[i].backgroundColor = gradient;
            // }else{
            //     result[i].backgroundColor = dataColors[i].color;
            // }
            // result[i].data = dataSetResult
        }
        console.log('GETDATASET', {result});
        return result;
    }
    getDataSet(chartsName, ctx){
        const result = this.state.dataSets;
        result.forEach( (item, i)=>{
            item.data = this.getData.bind(this)(chartsName, i);
        });

        console.log('GETDATASET', {result})
        return result;
    }
    getDataSet_OLD(chartsName, ctx){
        let result = this.state[chartsName];
        if(result.length===0){
            return [];
        }
        if(typeof result[0].backgroundColor === 'string' ){
            const rgb = this.hexToRGB.bind(this)(result[0].backgroundColor)
            console.log({rgb})
            const gradient = ctx.createLinearGradient(0,0,0, 600);
            gradient.addColorStop(0, 'orange');
            gradient.addColorStop(1, 'purple');
            for(var i=0; i<result.length;i++){
                result[i].backgroundColor = gradient;
            }
        }
        return result;
    }

    keepItFunctional_OLD(canvas){
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0,0,100,0);
        console.log({canvas})
        return {
                labels: this.state.labels,
                datasets: this.state['charts'+this.state.selectedTimeFrame],
                backgroundColor: gradient
        }
    }
    keepItFunctional(canvas){
        const ctx = canvas.getContext("2d")
        console.log({canvas})
        const datasets = this.getDataSet.bind(this)('charts'+this.state.selectedTimeFrame, ctx);
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