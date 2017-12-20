import React, {Component} from 'react';

import { Line, Bar, Pie } from './chartjs';

import randomColor from 'randomcolor';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FlatButton from 'material-ui/FlatButton';

const GetChart = (params)=>{
    const { chartType, baseName, average, spread, ticks, mainColor, genData, genColors, genDates, getDataSet, getLabels } = params;
    return class MyChart extends Component{
        constructor(props){
            super(props);
            this.state={
                baseName,
                charts6Days: [],
                charts6Weeks: [],
                charts6Months: [],
                dataColors: [],
                dates6Days:[],
                dates6Weeks: [],
                dates6Months: [],
                selectedTimeFrame: '6Days',
                chartLabels6Days: [],
                chartLabels6Weeks: [],
                chartLabels6Months: [],
                dataSets: [],
                labels: [],
                gendata: {
                    average,
                    spread,
                    ticks
                },
                mainColor,
            };
    
        }    

        componentDidMount(){
            // this.setState({interval:this.interval.bind(this)()});
            genData.call(this, this.state.gendata.average, this.state.gendata.spread, this.state.gendata.ticks);
            genColors.call(this);
            genDates.call(this);
        }
        render(){
            console.log('RENDER', this.state)
            if(this.state.counter===4){clearInterval(this.state.interval)};
            const disabled = this.state['charts'+this.state.selectedTimeFrame].length===0;
    
            return(
                <div className='grid-layout-bottom-display'>
                    <div  className='grid-layout-top-controls'>
                        <div>
                            <FloatingActionButton mini={true} style={{marginRight: 20}} onClick={()=>{this.handleAddButton.bind(this)()}}>
                                    <ContentAdd />
                            </FloatingActionButton>
                            <FloatingActionButton mini={true} secondary={true} style={{marginRight: 20}} onClick={()=>{this.handleRemoveButton.bind(this)()}}>
                                <ContentRemove />
                            </FloatingActionButton>
                        </div> 
                        <div>
                            <FlatButton label="6 Days"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Days')}} disabled={disabled} />
                            <FlatButton label="6 Weeks"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Weeks')}} disabled={disabled} />
                            <FlatButton label="6 Months"  fullWidth={true} onClick={()=>{this.selectTimeFrame.bind(this)('6Months')}} disabled={disabled} />
                        </div> 
                    </div>              
                    <div className="chart-display">
                        { this.getChart.bind(this)() }
                    </div>
                </div>
            )
        }
    
        selectTimeFrame(selectedTimeFrame){
            this.setState({selectedTimeFrame})
        }
    
        handleAddButton(){
            genData.call(this, this.state.gendata.average, this.state.gendata.spread, this.state.gendata.ticks);
            genColors.call(this);
        }
    
        handleRemoveButton(){
            const {
                charts6Days, charts6Weeks, charts6Months,
                chartLabels6Days, chartLabels6Weeks, chartLabels6Months,
                dataSets,
            } = this.state;
    
            // chart data
            let temp = Object.assign([], charts6Days);
            temp.pop();
            this.setState({charts6Days: temp});
    
            temp = Object.assign([], charts6Weeks);
            temp.pop();
            this.setState({charts6Weeks: temp});
    
            temp = Object.assign([], charts6Months);
            temp.pop();
            this.setState({charts6Months: temp});
    
            // chart labels
            temp = Object.assign([], chartLabels6Days);
            temp.pop();
            this.setState({chartLabels6Days: temp});
    
            temp = Object.assign([], chartLabels6Weeks);
            temp.pop();
            this.setState({chartLabels6Weeks: temp});
    
            temp = Object.assign([], chartLabels6Months);
            temp.pop();
            this.setState({chartLabels6Months: temp});
    
            // dataSet
            temp = Object.assign([], dataSets);
            temp.pop();
            this.setState({dataSets: temp});
    
        }
        getChart(){
            if(chartType==='line'){
                return(<Line data={this.functionalConstruction.bind(this)} options={{ responsive:true, height: '100%'}}/>);
            }else if(chartType==='bar'){
                return(<Bar data={this.functionalConstruction.bind(this)} options={{ responsive:true, height: '100%'}}/>);
            }else if(chartType==='pie'){
                return(<Pie data={this.functionalConstruction.bind(this)} options={{ responsive:true, height: '100%'}}/>);
            }else{
                return(<Line data={this.functionalConstruction.bind(this)} options={{ responsive:true, height: '100%'}}/>);
            }
        }
        functionalConstruction(canvas){
            const ctx = canvas.getContext("2d")
            const datasets = getDataSet.call(this,this.state.selectedTimeFrame, ctx);
            const result = {
                    labels: getLabels.bind(this)(),
                    datasets: datasets
            }
            return result;
        }
    
    }
    
}

export default GetChart;

