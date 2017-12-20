

function CreateDataLabelAccessor(state){
    return function getDataLabel(name, i){
        const result = state[name][i].slice(0);
        return result;
    }

}

export default CreateDataLabelAccessor;