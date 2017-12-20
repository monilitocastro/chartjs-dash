import React, { Component } from 'react';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import GetChart from '../charts/mychart';


// define functions for graphs
import genData from '../chartfunctions/generators/gentimeseriesdata';
import genMultiColors from '../chartfunctions/generators/genmulticolors';
import genDates from '../chartfunctions/generators/gendates';

import getLabels from '../chartfunctions/chartconstructors/getlabels';
import getDataSetMultiColor from '../chartfunctions/chartconstructors/getdatasetmulticolor';

const sleepIcon = <FontIcon className="material-icons">sleep</FontIcon>;
// const nearbyIcon = <IconLocationOn />;



// Construct charts
const SleepStudy = new GetChart({
    chartType: 'bar', 
    baseName:'Sleep Hours',
    average:8, 
    spread:6, 
    ticks: 6, 
    mainColor: 
    'blue', 
    genData, genColors:genMultiColors, genDates, getDataSet:getDataSetMultiColor, getLabels
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
        return(
          <div className="main-panel">
            <div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Sleep Hours"
                        icon={sleepIcon}
                        onClick={() => this.select(0)}
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
            return (<SleepStudy />)
        default:
            return (<div></div>)
        }
        
    }
}


export default (VitalSigns);
