import React from 'react'

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

// custom material design
import VerticalTabs from './verticaltabs';


const Aside = (props) => {
    return (
      <div className="box aside">
        <div></div>
        <div>
          <Drawer open={true}
            containerStyle={{backgroundColor:'#363535'}}
          >
            <AppBar
              title="DEMO"
              zDepth={0}
              showMenuIconButton={false}
              style={{backgroundColor:'#4E4E4E'}}
              titleStyle={{fontFamily:'Roboto', fontWeight:'100', textAlign:'center'}}
            />
            <VerticalTabs groupName='measurements_and_panels'/>
          </Drawer>
        </div>
      </div>
    );
  }


export default Aside;
