
function getData(chartName, i){
    const result = Object.assign([], this.state[chartName][i]);
    return result;
}

export default getData;