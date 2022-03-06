class HashTable {
  constructor (capacity = 97) {
    this.table = new Array(capacity)
    this.size = 0;
    this.loadFactor = 0.75
  }
  
  _hash(key){
    let hash = 0;
    for(let index = 0, len = key.length; index < len; index++){
      hash += key.charCodeAt(index)
    }
    
    return hash % this.table.length
  }
  
  rehash(capacity){
    const newInstance = new HashTable(capacity)
    
    newInstance.table = newInstance.table.map((newTable, newIndex) => {
      if(this.table[newIndex]){
        return this.table[newIndex]
      }
      return newTable
    })
    
    this.table = newInstance.table
  }
  
  getLoadFactor(){
    return this.size / this.table.length
  }
  
  set(key, value){
    if (this.getLoadFactor() > this.loadFactor) {
      this.rehash(this.table.length * 2)
    }
    
    const idx = this._hash(key)
    
    if(this.table[idx] && this.table[idx].length){
      this.table[idx].push([key, value])
    } else {
      this.table[idx] = [[key,value]]
    }
    
    this.size++;
  }
  
  get(key){
    const idx = this._hash(key)
    if(!this.table[idx]){
      return undefined
    }
    
    return this.table[idx].find(item => item[0] === key)[1]
  }
  
  remove(key){
    const idx = this._hash(key)
    let isRemoved = false
    
    if(this.table[idx] && this.table[idx].length){
      for(let index = 0, len = this.table[idx].length; index < len; index++){
        if(this.table[idx][index][0] === key){
          this.table[idx].splice(index, 1)
          this.size--;
          isRemoved = true
          break;
        }
      }
    }
    
    return isRemoved
  }
  
  display(){
    this.table.forEach((data) => {
      if (data) {
        data.forEach(item => {
          const [key, value] = item
          console.log(`[key: ${key}, value: ${value}]`)
        })
      }
    })
  }
  
}

const ht = new HashTable()
ht.set('Dell', 1)
ht.set('UFO', 2)
ht.set('Webstorm', 342)

console.log(ht.get('Dell'))

ht.set("Merhaba", 76);
ht.set("Ola!", 14);

ht.display();

ht.set("Canada", 111);
ht.set("Adanac", 168);
ht.set("Data Structures", 9);
ht.set("Algorithms", 64);
ht.set("I believe, I can fly", 12);
ht.set("Just do it!", 87);
ht.set("You will never walk alone!", 10);

console.log(ht.size);
console.log(ht.get('Merhaba'));

ht.remove("Algorithms");

ht.display();

