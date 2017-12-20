function getBackgroundColor(ctx, i){
    const gradient = ctx.createLinearGradient(0,0,50,500);
    const dataColor = this.state.dataColors[i];
    if(dataColor.gradient){
        dataColor.gradient.forEach( (color, i)=>{
            gradient.addColorStop(i, color);
        })
        return gradient;
    }else{
        return dataColor.color;
    }
}

export default getBackgroundColor;