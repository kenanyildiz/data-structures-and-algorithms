function search(val, arr){
  const len = arr.length
  let lower = 0
  let upper = len - 1
  
  while(lower <= upper){
    console.log('TRY')
    const middle = lower + (Math.floor((upper - lower) / 2))

    if(val === arr[middle]){
      return val
    }
    
    if(val < arr[middle]){
      upper = middle - 1
    } else {
      lower = middle + 1
    }
  }
  
  return -1
}

const values = [0,1,2,3,4,5,6,7,8,9,10]

console.log(search(5,values))
