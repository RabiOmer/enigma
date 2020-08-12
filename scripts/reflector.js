class Reflector {
    
    pairs = [];

    constructor(){
        this.setPairs();
    }
    // set reflector pairs
    setPairs(){
        this.pairs = [25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]
    }

    //return a index reflation
    getNewIndex(index){
        if(isNaN(index)) return;
        if(index % 0 !== 0 && index < 0 && index > 25) return;
        return this.pairs[index];
    }
    
}
