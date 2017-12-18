import React from 'react';
import HeartRateLineChart from '../../chartjs/heartratelinechart';

const VitalSignsField = (props)=>{
    return(
        <div className='quadrant'>
            <HeartRateLineChart />
            <HeartRateLineChart />
            <HeartRateLineChart />
            <HeartRateLineChart />
        </div>
    )
}

export default VitalSignsField;