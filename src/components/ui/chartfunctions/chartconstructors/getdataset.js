import getBackgroundColor from './getbackgroundcolor'
import getDataLabel from './getdatalabel';
import getData from './getdata';

function getDataSet(chartsName, ctx){
    const result = this.state.dataSets;
    result.forEach( (item, i)=>{
        item.data = getData.bind(this)('charts'+chartsName, i);
        item.label = getDataLabel.bind(this)('chartLabels'+chartsName, i)
        item.backgroundColor = getBackgroundColor.bind(this)(ctx, i);
    });

    return result;
}

export default getDataSet;