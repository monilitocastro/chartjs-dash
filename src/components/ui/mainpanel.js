import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import MyChart from './linechart';

class MainPanel extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            asideTabContext: nextProps.tabContexts.asideTabContext,
            selectedId: nextProps.tabContexts.selectedId
        });
    }
    render(){
        return(
          <div className="main-panel">
              <MyChart />
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
