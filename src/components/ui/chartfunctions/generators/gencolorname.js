function genColorName(exceptColor){
    const colorArray = [
        'orange',
        'red',
        'blue',
        'green',
        'white',
        'black',
        'purple',
        'pink',
        'brown',
        'yellow'
    ];
    while(true){
        const index = Math.ceil(Math.random() * (colorArray.length-1))
        const color = colorArray[index];
        if(color!==exceptColor){
            return color;
        }
    }
}

export default genColorName;