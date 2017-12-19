import React, {Component} from 'react';
import { Line, Chart } from './chartjs';
import update from 'immutability-helper';
import randomColor from 'randomcolor';

class LineChart extends Component{
    constructor(props){
        super(props);
        this.state={
            sampleData: [[1,2,4,6,2,4],[2,4,3,1,2,4],[1,4,3,5,6,2],[1,2,4,5,3,4]],
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
        this.setState({interval:this.interval.bind(this)()});

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

    genData(){
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
        }
    }
    render(){
        if(this.state.counter===4){clearInterval(this.state.interval)}

        return(
            <div><Line data={this.keepItFunctional.bind(this)} /></div>
        )
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