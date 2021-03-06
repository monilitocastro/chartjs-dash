
import CreateDataSetAccessor from './factory/createdatasetaccessor';
import CreateDataAccessor from './factory/createdataaccessor';
import CreateDataLabelAccessor from './factory/createdatalabelaccessor';
import CreateBackgroundColorAccessor from './factory/createbackgroundcoloraccessor';

function getDataSet(chartsName, ctx){
    const getData = new CreateDataAccessor(this.state);
    const getDataLabel = new CreateDataLabelAccessor(this.state);
    const getBackgroundColor = new CreateBackgroundColorAccessor(this.state, 'multicolor');
    const getDataSet = (new CreateDataSetAccessor(this.state, getBackgroundColor, getDataLabel, getData)).run();
    

    return getDataSet(chartsName, ctx);
}

export default getDataSet;