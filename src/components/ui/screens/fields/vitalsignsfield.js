import React, { Component } from 'react';
import HeartRateLineChart from '../../chartjs/heartratelinechart';

import { connect } from 'react-redux';
import * as actions from '../../../../actions/index';

class VitalSignsField extends Component{
    constructor(props){
        super(props);
        this.state = {
            vitalSigns: {},
            heartRatesSelect: 'days',
            bloodPressureRatesSelect: 'days'
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.vitalSigns){
            const { vitalSigns } = nextProps;
            this.setState({vitalSigns})
        }
    }
    componentWillMount(){
        this.props.getAllVitalSigns();
    }
    render(){
        console.log('RENDER', this.state)
        const { dates, heartRates  } = this.state.vitalSigns;
        if( dates!==undefined && heartRates!==undefined){
            return(
                <div className='quadrant'>
                    <HeartRateLineChart
                        buildChartJS = { 
                            this.buildChartJS.bind(this)
                        }
                        label="Heart Rate"
                        text="Heart rates (bpm)"
                        dates={dates}
                        data={heartRates}
                        select={this.state.heartRatesSelect} />
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
    buildChartJS(label, text, dates, values){
        console.log('values',values)
    const chartJSON = {
        chartData: {
            labels: dates,
            datasets: [{ 
                data: values,
                label,
                borderColor: "#3e95cd",
                fill: false
            }
            ]
        },
        options: {
            title: {
            display: true,
            text
            }
        }
    };
        console.log('build', chartJSON);
        // this.props.chartData = chartJSON.chartData;
        return chartJSON.chartData;
    }
    
}

function mapStateToProps(state){
    console.log('state', state);
    return {
        vitalSigns: state.chartContexts.vitalSigns
    }
}

export default connect(mapStateToProps, actions)(VitalSignsField);
