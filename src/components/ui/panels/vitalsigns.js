import React, { Component } from 'react';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import GetChart from '../charts/mychart';

const recentsIcon = <FontIcon className="material-icons">temperature</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">heart rate</FontIcon>;
// const nearbyIcon = <IconLocationOn />;

const BodyTemperatureChart = new GetChart({chartType: 'pie', baseName:'Body Temp (F)', average: 96.8, spread:7, ticks: 6, mainColor: 'orange', uniqueColorsForEachDatum: 'true'});
const HeartRateChart = new GetChart({baseName:'Heart Rate (bpm)', average: 70, spread:15, ticks: 6, mainColor: 'pink'});

  

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
