
function CreateDataAccessor(state){
    return function getData(chartName, i){
        const result = Object.assign([], state[chartName][i]);
        return result;
    }

}
    
export default CreateDataAccessor;