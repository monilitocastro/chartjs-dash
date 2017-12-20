function getLinearGradient(params){
    const {ctx, color} = params;      // color from dataColor
    let result = '';
    const gradient = ctx.createLinearGradient(0,0,100,500);
    color.gradient.forEach( (color, i)=>{
        gradient.addColorStop(i, color);
    })
    return gradient;
}

export default getBackgroundColor;