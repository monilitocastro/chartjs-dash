import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import VitalSignsPanel from './panels/vitalsigns'

class MainPanel extends Component {
    constructor(props){
        super(props);
        this.state = {            
            selectedTabId: 'VITAL_SIGNS',
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            asideTabContext: nextProps.tabContexts.asideTabContext,
            selectedTabId: nextProps.tabContexts.selectedId
        });
    }

    render() {
        return (
        <div>
            {this.getPanel.bind(this)()}
        </div>
        );
    }
    getPanel(){
        const { selectedTabId } = this.state;
        console.log('GETPANEL', selectedTabId)
        switch(selectedTabId){
            case 'VITAL_SIGNS':
                return (<VitalSignsPanel />)
            default:
                return (<div></div>)
        }
    }
}


function mapStateToProps(state){
    return {
        tabContexts: state.tabContexts
    }
}

export default connect(mapStateToProps, actions)(MainPanel);
