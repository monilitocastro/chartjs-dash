import React, {Component} from 'react';

import Chart from '../chartjs/chart';

class VitalSignsScreen extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <div className='heart-rate-screen'>
                <div className='heart-rate-band'></div>
                <div className='heart-rate-field'>
                    <div className='quadrant'>
                        <Chart />
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VitalSignsScreen;