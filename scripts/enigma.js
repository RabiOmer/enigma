class Enigma {

    constructor() {
        this.routers = [null, null, null];
        this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        this.KeyBoard  = new KeyBoard();
        this.reflector = new Reflector();
        this.endPoint  = new EndPoint();
        this.plugBoard = new PlugBoard(this.letters);
        this.routersMove = [[],[],[]];
        this.endPoint.clearAll();
        this.loadMachine();
    }

    loadMachine() {
        for (let i = 0; i < this.routers.length; i++) {
            this.routers[i] = new Router(i, this.getRandomRouserPosition(i));
        }
        document.addEventListener('keyup', this.pressKey.bind(this));
    }

    pressKey(event){
        console.log(event)
        let backspace = false;
        if(event.code == 'Space') this.endPoint.setValue(' ');
        else if(event.code == 'Backspace') backspace = this.endPoint.clearLastValue();
        else if(event.code == 'Delete') backspace = this.endPoint.clearAll();

        if(backspace) this.reversRouters()
        if(!this.letters.includes(event.key)) return;
        this.KeyBoard.isPressed(event.key);
        this.inputLetter(event.key);
    }

    reversRouters(){
        for (let index = 0; index < this.routersMove.length; index++) {
            const element = this.routersMove[index];
            if(element[element.length-1] == 1) {
                this.routers[index].reversPosition();
            }
            element.splice(element.length-1,1);
        }
    }

    // return random number between 0 to this.latter length
    getRandomRouserPosition(i) {
        if(i == 0) return 10
        if(i == 1) return 25
        if(i == 2) return 2
        // let max = this.letters.length;
        // let min = 0;
        // return Math.floor(Math.random() * (max - min) + min);
    }

    // get letter by index
    getLetterByIndex(index) {
        if (isNaN(index)) return;
        if (index % 0 !== 0 && index < 0 && index > 25) return;
        return this.letters[index];
    }

    // get index by letter 
    getIndexByLetter(letter){
        let letterIndex = this.letters.findIndex((e)=> e == letter);
        return letterIndex;
    }
    inputLetter(e){
        if(e && this.letters.includes(e)){
            this.startInscription(e)
        }
    }
    startInscription(letter){
        console.log('!!! start incription !!! - ',letter)
        let letterNewPos,newLatter,firstPair,secondPair;
        letterNewPos = this.getIndexByLetter(letter);
        firstPair = this.plugBoard.getPair(letterNewPos)
        console.log({firstPair})
        console.log(this.getLetterByIndex(firstPair))
        letterNewPos = firstPair != null ?  firstPair : letterNewPos;
        this.moveRouters();
        letterNewPos = this.routers[0].getLetterNewPosition(letterNewPos,true);
        letterNewPos = this.routers[1].getLetterNewPosition(letterNewPos,true);
        letterNewPos = this.routers[2].getLetterNewPosition(letterNewPos,true);
        letterNewPos = this.reflector.getNewIndex(letterNewPos);
        letterNewPos = this.routers[2].getLetterNewPosition(letterNewPos,false);
        letterNewPos = this.routers[1].getLetterNewPosition(letterNewPos,false);
        letterNewPos = this.routers[0].getLetterNewPosition(letterNewPos,false);

        secondPair = this.plugBoard.getPair(letterNewPos)
        letterNewPos = secondPair != null ?  secondPair : letterNewPos;

        newLatter = this.getLetterByIndex(letterNewPos);
        this.endPoint.setValue(newLatter)
    }

    moveRouters(){
        let routerFullSpin = this.routers[0].setRouterNewPosition();
        this.routersMove[0].push(1);
        if(routerFullSpin) routerFullSpin = this.routers[1].setRouterNewPosition();
        if(routerFullSpin) this.routersMove[1].push(1);
        else this.routersMove[1].push(0);
        if(routerFullSpin) routerFullSpin = this.routers[2].setRouterNewPosition();
        if(routerFullSpin) this.routersMove[2].push(1);
        else this.routersMove[2].push(0);
    }
}