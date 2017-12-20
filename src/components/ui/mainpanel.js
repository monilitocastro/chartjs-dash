import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import VitalSigns from './panels/vitalsigns'

class MainPanel extends Component {
    constructor(props){
        super(props);
        this.state = {            
            selectedTabId: '',
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
        if(selectedTabId==='VITAL_SIGNS'){
            return(<VitalSigns />);
        }else{
            return (<div></div>);
        }
    }
}


function mapStateToProps(state){
    return {
        tabContexts: state.tabContexts
    }
}

export default connect(mapStateToProps, actions)(MainPanel);
