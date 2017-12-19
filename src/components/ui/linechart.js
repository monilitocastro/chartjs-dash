import React, {Component} from 'react';
import { Line, Chart } from './chartjs';
import update from 'immutability-helper';
import * as d3 from 'd3-interpolate';

class LineChart extends Component{
    constructor(props){
        super(props);
        this.state={
            sampleData: [[1,2,4,6,2,4],[2,4,3,1,2,4],[1,4,3,5,6,2],[1,2,4,5,3,4]],
            data: [{
                data:[2,4,5,3,4,2],
                label:'0',
                backgroundColor: '#359'
        }],
            counter: 0
        };
    }
    componentDidMount(){
        this.setState({interval:this.interval.bind(this)()});

    }
    interval(){
        return setInterval(()=>{
            console.log({counter:this.state.interval})
            const data = {
                data: this.state.sampleData[this.state.counter],
                label: this.state.counter,
                backgroundColor: '#' + Math.ceil(Math.random() * 999)
            };
            this.state.data.push(data); //update(oldData, {$push: this.state.sampleData[this.state.counter]})
            this.setState({counter: this.state.counter+1})
        }, 1000);
    }
    render(){
        if(this.state.counter===4){clearInterval(this.state.interval)}

        const data = (canvas) => {
            const ctx = canvas.getContext("2d")
            const gradient = ctx.createLinearGradient(0,0,100,0);
            console.log({canvas})
            return {
                    labels: ["1am", "2am", "3am","4am", "5am", "6am"],
                    datasets: this.state.data
                }
            
        }

        return(
            <div><Line data={data} /></div>
        )
    }

    randomOrangeColor(){
        
    }
}

export default LineChart;