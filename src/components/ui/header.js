import React from 'react';

import AppBar from 'material-ui/AppBar';

const Header = (props)=>{
    return(
      <div className="box appBar">
        <AppBar
          title="Title"
          zDepth={0}
          style={{backgroundColor:'#8DCEF8'}}
        />
      </div>
    );
  }

  export default Header;