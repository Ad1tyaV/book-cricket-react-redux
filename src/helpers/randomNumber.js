const getCeilValue=(prefixArray,randomValue)=>{

    var ceilValue=-2;
    for(var i=0;i<prefixArray.length;){
        if(randomValue>=prefixArray[i]){
            i++;
        }
        else{ 
            ceilValue = i;
            break;
        }
    }
    if(ceilValue===-2) return prefixArray.length-1;

    return ceilValue;

}

const RandomWithIndex=(batterIndex)=>{    

    const cumulativeSum = (sum => value => sum += value)(0);
    var arr=[-1,0,1,2,3,4,6];
    var freq=[];
    var prefix=[];
    //console.log(batterIndex);
    //console.log(typeof(batterIndex));
    switch(batterIndex){
        
        case -1:{
            freq=[3,80,50,10,1,15,5]// RG Sharma 156 balls  166
            prefix = freq.map(cumulativeSum)            
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 1:{
            freq=[3,70,45,14,0,12,2]//143 balls Shikhar 133
            prefix = freq.map(cumulativeSum)
            //console.log(prefix)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            //console.log(random)
            let index_rc=getCeilValue(prefix,random)
            //console.log(index_rc)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 2:{
            freq=[3,91,50,16,1,17,2]//Kohli 177 balls 165
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 3:{
            freq=[4,80,45,16,1,10,5]//Shreyas 157 balls 150
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 4:{
            freq=[5,91,45,7,1,18,6]//Pant 149 balls 178
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 5:{
            freq=[5,91,40,5,1,12,7]//KL R 160 balls 181
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 6:{
            freq=[6,80,38,5,1,15,8]//Pandya 158 balls 181
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 7:{
            freq=[6,80,45,16,1,18,4]//Jadeja 165 balls 176
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 8:{
            freq=[9,100,15,8,1,18,6]//Thakur 144 balls 127
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        case 9:{
            freq=[9,100,25,15,1,18,2]//Bhuvi 160 balls 142
            prefix = freq.map(cumulativeSum)
            let random = Math.floor(Math.random()*prefix[prefix.length-1])
            let index_rc=getCeilValue(prefix,random)
            //console.log(arr[index_rc])
            return arr[index_rc];
        }
        default:{            
            //console.log('In default')
            return 1;
        }
    }

}

export default RandomWithIndex;