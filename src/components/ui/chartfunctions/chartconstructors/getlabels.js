
function getLabels(){
    const { selectedTimeFrame } = this.state;
    const name = 'dates' + selectedTimeFrame;
    const result = this.state[name];
    return result;
}
export default getLabels;