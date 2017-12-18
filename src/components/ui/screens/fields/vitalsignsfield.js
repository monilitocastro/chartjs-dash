import React, { Component } from 'react';
import HeartRateLineChart from '../../chartjs/heartratelinechart';

import { connect } from 'react-redux';
import * as actions from '../../../../actions/index';
import update from 'immutability-helper';

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
                            this.buildChartJS_Multi.bind(this)
                        }
                        label="Heart Rate"
                        text="Heart rates (bpm)"
                        dates={dates}
                        data={[heartRates]}
                        select={this.state.heartRatesSelect}
                        selectFunction={(heartRatesSelect)=>{
                            console.log('select', heartRatesSelect)
                            this.setState({heartRatesSelect})
                        }} />
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
    buildChartJS_Multi(labelsMutable, text, datesMutable, valuessMutable){
        valuessMutable = valuessMutable.map((item)=>{
            return Object([], item);
        });
        const labels = Object.assign([], labelsMutable),
        dates = Object.assign([],datesMutable),
        valuess = Object.assign([],valuessMutable);

        const datasets = valuess.map((values, i)=>{
            return {
                data: values[i],
                label: labels[i],
                borderColor: "#3e95cd",
                fill: false

                }
            
        });

        console.log('valuess',valuess)
        const chartJSON = {
            chartData: {
                labels: dates,
                datasets
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
        return chartJSON;
    }    
    buildChartJS(label, text, datesMutable, valuesMutable){
        const dates = Object.assign([],datesMutable),
        values = Object.assign([],valuesMutable);

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
        return chartJSON;
    }
    
}

function mapStateToProps(state){
    console.log('state', state);
    return {
        vitalSigns: state.chartContexts.vitalSigns
    }
}

export default connect(mapStateToProps, actions)(VitalSignsField);
