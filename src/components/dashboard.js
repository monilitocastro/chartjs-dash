import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

const Avatar = (props)=>{
  return(
    <div className="box avatar">
      <p style={{textAlign:'center', fontWeight:300, fontSize: 36, margin:'auto'}}>APRICITY</p>
    </div>
  );
}
const Header = (props)=>{
  return(
    <div className="box appBar">
      <AppBar
        title="Title"
        zDepth={0}
      />
    </div>
  );
}

const Aside = (props) => {
  return (
    <div className="box aside">
      <div></div>
      <div>
        <MenuItem>Cardiovascular Monitor</MenuItem>
        <MenuItem>Comprehensive Metabolic Panel</MenuItem>
        <MenuItem>Liver Function Panel</MenuItem>
      </div>
    </div>
  );
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    
    return (
      <MuiThemeProvider>
        <div className='dashboard'>
          <Avatar />
          <Header />
          <Aside />
          <div className="box d"></div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Dashboard;