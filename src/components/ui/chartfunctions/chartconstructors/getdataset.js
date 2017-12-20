import getBackgroundColor from './getbackgroundcolor'

function getDataSet(chartsName, ctx){
    const result = this.state.dataSets;
    result.forEach( (item, i)=>{
        item.data = this.getData.bind(this)('charts'+chartsName, i);
        item.label = this.getDataLabel.bind(this)('chartLabels'+chartsName, i)
        item.backgroundColor = getBackgroundColor.bind(this)(ctx, i);
    });

    return result;
}

export default getDataSet;