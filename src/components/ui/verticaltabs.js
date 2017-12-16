import React, {Component} from 'react';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import * as actions from '../../actions/index';
// custom material design
import Tab from './tab';

/**
 * Holds the state of 
 */
class VerticalTabs extends Component{
    static propTypes = {
        groupName: PropTypes.string.isRequired
    };
    constructor(props){
        super(props);
        this.state={};
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps VERT2', nextProps);
        this.setState({
            asideTabContext: nextProps.tabContexts.asideTabContext,
            selectedId: nextProps.tabContexts.selectedId
        });
    }

    componentWillMount(){
        // console.log('componentWillMount VERT', this.props);
        this.props.getTabs(this.props.groupName);
    }

    renderMenuItems(menuItems){
        const menuList = [];

    }

    render(){
        if( this.state.asideTabContext && 
            this.state.asideTabContext.menuItems && 
            this.state.asideTabContext.groupName &&
            this.props.selectTab){
            const { groupName, menuItems } = this.state.asideTabContext;
            const selectTab = this.props.selectTab;
            const menuList = menuItems.map( (item)=>{
                const {text, id} = item;
                const isHighlighted = (this.state.selectedId!==undefined)|| (this.state.selectedId!==null)? this.state.selectedId===id: false;
                return (<Tab groupName={groupName} isHighlighted={isHighlighted} text={text} id={id} key={id} selectTab={selectTab}/>);
            });
            return(menuList);
        }else{
            return(<div></div>);
        }
    }
}

function mapStateToProps(state){
    // this is closed for modification
    return {
        tabContexts: state.tabContexts
    }
}

export default connect(mapStateToProps, actions)(VerticalTabs);

/**
 * JSON shape 
 * {
 * ...
 *  tabContexts: [
 *                  {
 *          'tabContext': {
 *              groupName: String,
 *              menuItems: Array({
 *                  text: String,
 *                  id: String
 *              }),
 *              selectedId: String,
 *              updateTabSelection: Func
 *          }
 *      ...
 *      ]
 *  }
 */