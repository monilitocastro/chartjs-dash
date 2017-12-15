import React from 'react';

import MenuItem from 'material-ui/MenuItem';

/**
 * On click triggers updateSelectionFunction with groupName, id
 * @param {*} props 
 */
const Tab = (props)=>{
    const {text, id, updateTabSelection, groupName} = props;
    <MenuItem 
    onClick={(ev)=>{
        updateTabSelection(groupName, id);
    }}
    style={{color:'#aaa'}}>{text}</MenuItem>
};

export default Tab;



/*
            <MenuItem style={{color:'#aaa'}}>CARDIO</MenuItem>
            <MenuItem style={{color:'#aaa'}}>CMP</MenuItem>
            <MenuItem style={{color:'#aaa'}}>LIVER FUNCTION</MenuItem>
            */