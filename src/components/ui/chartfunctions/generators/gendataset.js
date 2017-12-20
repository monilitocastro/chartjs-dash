function genDataSet( arr, name ){
    const dataset = {
        data: arr,
        label: this.state.baseName + ': ' + name
    };
    return dataset;
}

export default genDataSet;