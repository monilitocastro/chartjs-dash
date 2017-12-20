import React, { Component } from 'react';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import GetChart from '../charts/mychart';


// define functions for graphs
import genData from '../chartfunctions/generators/gentimeseriesdata';
import genColors from '../chartfunctions/generators/gencolors';
import genDates from '../chartfunctions/generators/gendates';

import getDataSet from '../chartfunctions/chartconstructors/getdataset';
import getLabels from '../chartfunctions/chartconstructors/getlabels';

const recentsIcon = <FontIcon className="material-icons">temperature</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">heart rate</FontIcon>;
// const nearbyIcon = <IconLocationOn />;



// Construct charts
const BodyTemperatureChart = new GetChart({
    chartType: 'bar', 
    baseName:'Body Temp (F)',
    average: 96.8, 
    spread:7, 
    ticks: 6, 
    mainColor: 
    'orange', 
    genData, genColors, genDates, getDataSet, getLabels
});
const HeartRateChart = new GetChart({
    baseName:'Heart Rate (bpm)', 
    average: 70, 
    spread:15, 
    ticks: 6, 
    mainColor: 'pink',
    genData, genColors, genDates, getDataSet, getLabels
});



class VitalSigns extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }
    select = (index) => this.setState({selectedIndex: index});
    render(){
        console.log('RENDER', this.state)
        return(
          <div className="main-panel">
            <div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Body Temperature"
                        icon={recentsIcon}
                        onClick={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Heart Rate"
                        icon={favoritesIcon}
                        onClick={() => this.select(1)}
                    />
                    </BottomNavigation>
                </Paper>
            </div>
            <div>
                { this.getChart.bind(this)()}
            </div>
          </div>
        );
    }

    getChart(){
        switch(this.state.selectedIndex){
        case 0:
            return (<BodyTemperatureChart />)
        case 1:
            return (<HeartRateChart />)
        default:
            return (<div></div>)
        }
        
    }
}


export default (VitalSigns);
