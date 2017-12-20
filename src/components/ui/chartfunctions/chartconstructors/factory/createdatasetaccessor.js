
function CreateDataSetAccessor(getBackgroundColor, getDataLabel, getData){
    return function getDataSet(chartsName, ctx){
        const result = this.state.dataSets;
        result.forEach( (item, i)=>{
            item.data = getData('charts'+chartsName, i);
            item.label = getDataLabel('chartLabels'+chartsName, i)
            item.backgroundColor = getBackgroundColor(ctx, i);
        });
    
        return result;
    }
    
}


export default CreateDataSetAccessor;