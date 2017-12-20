
function getDataLabel(name, i){
    const result = this.state[name][i].slice(0);
    return result;
}

export default getDataLabel;