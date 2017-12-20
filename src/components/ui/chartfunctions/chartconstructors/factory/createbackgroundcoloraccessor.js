
function CreateBackgroundColorAccessor(state, type){
    if(type==='multicolor'){
        return function getBackgroundMultiColor(ctx, i){
            // const gradient = ctx.createLinearGradient(0,0,100,500);
            const dataColor = state.dataColors[i];
            const result = dataColor.map( (item)=>{
            //     if(item.gradient){
            //         item.gradient.forEach( (color, i)=>{
            //             gradient.addColorStop(i, color);
            //         })
            //         return gradient;
            //     }else{
                    return item.color;
            //     }
            });
            // console.log('CREATEBACKGROUND', result)
            return result;
        }
    }else if(type==='multicolorgradient'){
        return function getBackgroundMultiColor(ctx, i){
            const gradient = ctx.createLinearGradient(0,0,100,1000);
            const dataColor = state.dataColors[i];
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
            console.log('CREATEBACKGROUND', result)
            return result;
        }
    }else{
        return function getBackgroundColor(ctx, i){
            const gradient = ctx.createLinearGradient(0,0,10,500);
            const dataColor = state.dataColors[i];
            if(dataColor.gradient){
                dataColor.gradient.forEach( (color, i)=>{
                    let i2 = i;
                    if(i===0)i2=0.4
                    gradient.addColorStop(i2, color);
                })
                return gradient;
            }else{
                return dataColor.color;
            }
        }
    }

}


export default CreateBackgroundColorAccessor;