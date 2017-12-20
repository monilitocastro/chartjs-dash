
import randomColor from 'randomcolor';
import genColorName from './gencolorname';
import prepareItemForState from '../prepareitemforstate'

function genMultiColors(){ // store colors
    const ticks = this.state.gendata.ticks;
    let backgroundColors = [];

    for(var i=0;i<ticks;i++){    
        const bgColor1 = randomColor({
            hue: genColorName.call(this,this.state.mainColor)
        });
        const bgColor2 =  this.state.mainColor    
        // store colors
        backgroundColors.push({
            gradient: [bgColor1, bgColor2],
            color: bgColor1
        })

    }





    const dataColors = prepareItemForState.call(this, backgroundColors, 'dataColors');        
    this.setState({dataColors});
}

export default genMultiColors;