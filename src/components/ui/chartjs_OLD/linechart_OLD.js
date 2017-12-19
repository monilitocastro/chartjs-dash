import React from 'react';

// import material ui
import FlatButton from 'material-ui/FlatButton';

// import react chartjs 2
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    console.log('PROPS', props)
    if(props.label && 
        props.text && 
        props.dates && 
        props.data &&
        props.select &&
        props.buildChartJS){
        const {label, text, dates, data, select, buildChartJS, selectFunction} = props;
        // console.log('buildchartjs', buildChartJS)
        const result = buildChartJS(label, text, dates[select], data[select]);
        return(
            <div className="interactive-chart">
                <div>
                    <Line data={result.chartData} options={result.options}/>
                </div>
                <div className="interactive-chart-time-controls">
                    <FlatButton label="6 Days Ago"  fullWidth={true} onClick={()=>{selectFunction('days')}}/>
                    <FlatButton label="6 Weeks Ago"  fullWidth={true} onClick={()=>{selectFunction('weeks')}}/>
                    <FlatButton label="6 Months Ago"  fullWidth={true} onClick={()=>{selectFunction('months')}}/>
                </div>
            </div>
        );
    }else{
        console.error('Missing props in HeartRateLineChart');
        return(
            <div className="interactive-chart">
                <div>
                    <Line data={[]}/>
                </div>
                <div className="interactive-chart-time-controls">
                    <FlatButton label="6 Days Ago"  fullWidth={true} />
                    <FlatButton label="6 Weeks Ago"  fullWidth={true} />
                    <FlatButton label="6 Months Ago"  fullWidth={true} />
                </div>
            </div>
        );
    }

}

export default LineChart;