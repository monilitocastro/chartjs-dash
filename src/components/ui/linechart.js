import React, {Component} from 'react';
import { Line } from './chartjs';
import update from 'immutability-helper';
import randomColor from 'randomcolor';
import * as d3 from 'd3-interpolate';


import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class LineChart extends Component{
    constructor(props){
        super(props);
        this.state={
            sampleData: [[1,2,4,6,2,4],[2,4,3,1,2,4],[1,4,3,5,6,2],[1,2,4,5,3,4]],
            charts6Days: [],
            charts6Weeks: [],
            charts6Months: [],
            dates6Days:[],
            dates6Weeks: [],
            dates6Months: [],
            data: [{
                data:[2,4,5,3,4,2],
                label:'4',
                backgroundColor: randomColor({
                                    hue: 'orange'
                                })
        }],
            labels: ["1am", "2am", "3am","4am", "5am", "6am"],
            counter: 0
        };
    }
    componentDidMount(){
        // this.setState({interval:this.interval.bind(this)()});

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
        if(ticks===0){ return; }
        const arrMonths = [];
        for(var i=0;i<ticks;i++){
            const result = Math.ceil((Math.random()-0.5) * spread) + average;
            arrMonths.push(result)
        }
        console.log({arrMonths})
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
        console.log({arrWeeks})

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
        console.log({arrDays})
        const {charts6Days, charts6Weeks, charts6Months} = this.state;
        let temp = Object.assign([], charts6Days);
        console.log({temp})
        
        temp = update(charts6Days,{$push: [arrDays]});
        console.log({temp})
        this.setState({charts6Days: temp});

        temp = update(charts6Weeks, {$push: [arrWeeks] });
        this.setState({charts6Weeks: temp});

        temp = update(charts6Months, {$push: [arrMonths]});
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
        console.log({state:this.state})

        return(
            <div>
                <div>
                    <Line data={this.keepItFunctional.bind(this)} />
                </div>
                <div>
                    <FloatingActionButton mini={true} style={{marginRight: 20}} onClick={()=>{this.handleAddButton.bind(this)()}}>
                            <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        )
    }

    handleAddButton(){
        this.genData.bind(this)(96.8, 5, 6);
    }

    keepItFunctional(canvas){
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0,0,100,0);
        console.log({canvas})
        return {
                labels: this.state.labels,
                datasets: this.state.data
        }
    }

}

export default LineChart;