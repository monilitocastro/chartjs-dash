import React from 'react';

// import BANDS
import CardiologyBand from './screens/bands/cardiologyband.js';
import BloodPanelBand from './screens/bands/bloodpanelband.js';
import LiverPanelBand from './screens/bands/liverpanelband.js';

const MainPanel = (props)=>{
  return(
    <div className="main-panel">
      <CardiologyBand />
      <BloodPanelBand />
      <LiverPanelBand />
    </div>
  );
}

  export default MainPanel;