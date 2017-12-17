import React, {Component} from 'react';

import VitalSignsField from './fields/vitalsignsfield';

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
                    <VitalSignsField />
                </div>
            </div>
        )
    }
}

export default VitalSignsScreen;