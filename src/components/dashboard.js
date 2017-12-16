import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// custom material user interface
import Avatar from './ui/avatar';
import Aside from './ui/aside';
import Header from './ui/header'

class Dashboard extends Component {

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

// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';
// import AppBar from 'material-ui/AppBar';

