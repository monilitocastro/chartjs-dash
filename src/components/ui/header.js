import React from 'react';

import AppBar from 'material-ui/AppBar';


const style = {  
  position: 'fixed',
  top: 0,
  left: 256,
  zIndex: 999,
  margin: 'auto',
  width: '100%',
  height: 'auto',
  backgroundColor:'#8DCEF8'
}
const Header = (props)=>{
    return(
      <div className="box appBar">
        <AppBar
          title="Title"
          zDepth={0}
          style={style}
        />
      </div>
    );
  }

  export default Header;