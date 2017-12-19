import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// custom material user interface
import Avatar from './ui/avatar';
import Aside from './ui/aside';
import Header from './ui/header';
import MainPanel from './ui/mainpanel';

class Dashboard extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className='dashboard'>
          <Avatar />
          <Header />
          <Aside />
          <MainPanel />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Dashboard;