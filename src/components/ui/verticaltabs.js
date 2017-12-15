import React, {Component} from 'react';
import PropTypes from 'prop-types';

// custom material design
import Tab from './tab';

/**
 * Holds the state of 
 */
class VerticalTabs extends Component{
    static propTypes = {
        groupName: PropTypes.string.isRequired, 
        menuItems: PropTypes.array.isRequired, 
        selectedId: PropTypes.string.isRequired,
        updateTabSelection: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        const { groupName, menuItems, /*selectedId,*/ updateTabSelection } = this.props;
        const menuList = [];
        if(!menuItems){
            return(<div></div>);
        }
        menuItems.map( (item)=>{
            const {text, id} = item;
            menuList.push(<Tab groupName={groupName} updateTabSelection={updateTabSelection} text={text} id={id} key={id} />);
        });
        return(
            <div>
                { menuList }
            </div>
        )
    }
}

export default VerticalTabs;

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