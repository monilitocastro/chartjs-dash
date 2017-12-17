import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

class HeartRateLineChart extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <div>
                <Line />
            </div>
        )
    }
}

export default HeartRateLineChart;