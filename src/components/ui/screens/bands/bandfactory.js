import React from 'react';

const BandFactory = (className)=>{
  if(!className){
    throw 'BandFactor needs className'
  }
  return (props)=>{
    const { isShown } = props;
    const style = {
        display: isShown?"block":"none",
        height: "120px"
    };
    return(
      <div className={"band " + className} style={ style }>
      </div>
    );
  }
}

  export default BandFactory;