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
        const dataset = {
            data: arr,
            label: this.state.baseName + ' ' + name,
            backgroundColor: randomColor({
                                hue: 'orange'
                            })
        };
        return dataset;
    }
    genDataSet_OLD(){
        const timeFrameName = 'charts'+this.state.selectedTimeFrame;
        console.log({timeFrameName})
        const result = this.state[timeFrameName].map( (item, index)=>{
            console.log('state var ' + this.state[timeFrameName])
            console.log({result})
            const dataset = {
                data: this.state[timeFrameName][index],
                label: this.state.baseName + ' ' + index,
                backgroundColor: randomColor({
                                    hue: 'orange'
                                })
            };
            console.log('WITH ' + {dataset})
            return dataset;
        })
        console.log({result})
        return result;
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

        
        const {charts6Days, charts6Weeks, charts6Months} = this.state;
        let temp = Object.assign([], charts6Days);
        console.log({arrDays})
        temp = update(charts6Days,{$push: [arrDaysDS]});
        this.setState({charts6Days: temp});

        temp = update(charts6Weeks, {$push: [arrWeeksDS] });
        this.setState({charts6Weeks: temp});

        temp = update(charts6Months, {$push: [arrMonthsDS]});
        this.setState({charts6Months: temp});

        // const orangey = randomColor({
        //     hue: 'orange'
        // });
        // const data = {
        //     data: this.state.sampleData[this.state.counter],
        //     label: this.state.counter,
        //     backgroundColor: orangey,
        //     lineColor: orangey
        // };
        // this.state.data.push(data); //update(oldData, {$push: this.state.sampleData[this.state.counter]})
        // this.setState({counter: this.state.counter+1})
        
    }
    render(){
        if(this.state.counter===4){clearInterval(this.state.interval)};
        const disabled = this.state['charts'+this.state.selectedTimeFrame].length===0;
        console.log({state:this.state})

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

    keepItFunctional(canvas){
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0,0,100,0);
        console.log({canvas})
        return {
                labels: this.state.labels,
                datasets: this.state['charts'+this.state.selectedTimeFrame]
        }
    }

}

export default LineChart;