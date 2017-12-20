import update from 'immutability-helper';

function prepareItemForState(newDaysData, accessDaysName){
    const days = this.state[accessDaysName];
    const packedDays = update(days,{$push: [newDaysData]});
    return packedDays;
}

export default prepareItemForState;