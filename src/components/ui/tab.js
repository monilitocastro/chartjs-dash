import React from 'react';

import MenuItem from 'material-ui/MenuItem';

/**
 * On click triggers updateSelectionFunction with groupName, id
 * @param {*} props 
 */
const Tab = (props)=>{
    const {text, id, selectTab, groupName, isHighlighted} = props;
    return <MenuItem onClick={(ev)=>{
        props.selectTab(groupName, id);
    }}
    style={isHighlighted?{color:'#D35600',borderLeft:'3px solid #D35600'}:{color:'#999', borderLeft:0}}>{text}</MenuItem>
};

export default Tab;



/*
            <MenuItem style={{color:'#aaa'}}>CARDIO</MenuItem>
            <MenuItem style={{color:'#aaa'}}>CMP</MenuItem>
            <MenuItem style={{color:'#aaa'}}>LIVER FUNCTION</MenuItem>
            */