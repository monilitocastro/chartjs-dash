import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';

// // import BANDS
// import CardiologyBand from './screens/bands/cardiologyband.js';
// import BloodPanelBand from './screens/bands/bloodpanelband.js';
// import LiverPanelBand from './screens/bands/liverpanelband.js';

// import fields
import ReactChart from './screens/fields/reactchart.js';

class MainPanel extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps MAINPANEL', nextProps);
        this.setState({
            asideTabContext: nextProps.tabContexts.asideTabContext,
            selectedId: nextProps.tabContexts.selectedId
        });
    }
    render(){
        return(
          <div className="main-panel">
              <ReactChart />
          </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tabContexts: state.tabContexts
    }
}

export default connect(mapStateToProps, actions)(MainPanel);
