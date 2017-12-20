function getBackgroundMultiColor(ctx, i){
    const gradient = ctx.createLinearGradient(0,0,100,500);
    const dataColor = this.state.dataColors[i];
    const result = dataColor.map( (item)=>{
        if(item.gradient){
            item.gradient.forEach( (color, i)=>{
                gradient.addColorStop(i, color);
            })
            return gradient;
        }else{
            return item.color;
        }
    });
    return result;
}

export default getBackgroundMultiColor;