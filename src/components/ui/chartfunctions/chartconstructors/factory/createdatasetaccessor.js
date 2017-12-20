
function CreateDataSetAccessor(state, getBackgroundColor, getDataLabel, getData){
    this.run = function(){
        return function getDataSet(chartsName, ctx){
            const result = state.dataSets;
            result.forEach( (item, i)=>{
                item.data = getData('charts'+chartsName, i);
                item.label = getDataLabel('chartLabels'+chartsName, i)
                item.backgroundColor = getBackgroundColor(ctx, i);
            });
        
            return result;
        }
    }
    
}


export default CreateDataSetAccessor;