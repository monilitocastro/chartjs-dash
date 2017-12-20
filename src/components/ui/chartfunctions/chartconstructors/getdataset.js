import getBackgroundColor from './getbackgroundcolor'
import getDataLabel from './getdatalabel';
import getData from './getdata';

import CreateDataAccessor from './factory/createdataaccessor';
import CreateDataLabelAccessor from './factory/createdatalabelaccessor';
import CreateBackgroundColorAccessor from './factory/createbackgroundcoloraccessor';

function getDataSet(chartsName, ctx){
    const result = this.state.dataSets;
    const getData = new CreateDataAccessor(this.state);
    const getDataLabel = new CreateDataLabelAccessor(this.state);
    const getBackgroundColor = new CreateBackgroundColorAccessor(this.state);

    result.forEach( (item, i)=>{
        item.data = getData('charts'+chartsName, i);
        item.label = getDataLabel('chartLabels'+chartsName, i)
        item.backgroundColor = getBackgroundColor(ctx, i);
    });

    return result;
}

export default getDataSet;