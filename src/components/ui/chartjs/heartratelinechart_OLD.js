import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

import { connect } from 'react-redux';
import * as actions from '../../../actions/index';

// import material ui
import FlatButton from 'material-ui/FlatButton';

/**
 * TODO Get this working then turn into a generator
 * for other charts. For that to happen you need
 * to know what props and components used here
 * to parameterize
 */
class HeartRateLineChart extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     chartContexts:{
        //         timeFrameSelected: '6-days-ago'
        //     }
        // };
        const stateResult = {
            chartContexts:{
                heartRateChartContext:{
                    timeFrameSelected: '6-days-ago',
                    data:[],
                    chartData: {labels:[],datasets:[]}
                }
            }
        }
        this.state=stateResult;
    }
    buildChartJS(heartRateChartContext){
        let dataLabel = '';
        let dataValues = '';
        dataLabel = heartRateChartContext.data.map((item)=>{
        return item.datetime;
        });
        dataValues = heartRateChartContext.data.map((item)=>{
        return item.heartRate;
        })
        const chartJSON = {
            chartData: {
                labels: dataLabel,
                datasets: [{ 
                    data: dataValues,
                    label: "Daily Heart Rate",
                    borderColor: "#3e95cd",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                display: true,
                text: 'Heart Rate (bpm)'
                }
            }
        };
        console.log('build', chartJSON);
        // this.props.chartData = chartJSON.chartData;
        this.setState({            
            chartContexts:{
                heartRateChartContext:{
                    chartData: chartJSON.chartData
                }
        }});
    }
    componentWillMount(){
        this.props.getHeartRate(this.state.chartContexts.heartRateChartContext.timeFrameSelected);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.chartContexts && nextProps.chartContexts.heartRateChartContext.timeFrameSelected){
            this.setState({
                timeFrameSelected: nextProps.chartContext.heartRateChartContext.timeFrameSelected
            });
        }
        console.log('nextProps', nextProps)
        if(nextProps.chartContexts && nextProps.chartContexts.heartRateChartContext && nextProps.chartContexts.heartRateChartContext.data){
            this.setState({
                heartRateChartContext: nextProps.chartContexts.heartRateChartContext.data
            });
            console.log('SECOND CASE');
            this.buildChartJS.bind(this)(nextProps.chartContexts.heartRateChartContext);
        }
    }
    render(){
        if(this.state.chartContexts.heartRateChartContext.chartData){
            console.log('chartJSON', this.props.chartData)
            return(
                <div className="interactive-chart">
                    <div>
                    <Line data={this.state.chartContexts.heartRateChartContext.chartData} />
                    </div>
                    <div className="interactive-chart-time-controls">
                        <FlatButton label="6 Days Ago"  fullWidth={true} />
                        <FlatButton label="6 Weeks Ago"  fullWidth={true} />
                        <FlatButton label="6 Months Ago"  fullWidth={true} />
                    </div>
                </div>
            )
        }else{
            
            return(
                <div>
                    <Line />
                </div>
            )
        }
    }
}
function mapStateToProps(state){
    console.log('state', state);
    return {
        chartContexts: state.chartContexts
    }
}

export default connect(mapStateToProps, actions)(HeartRateLineChart);
