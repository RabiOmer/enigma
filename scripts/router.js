class Router {
    position = 0; // router position!
    routerIndex = 0;
    viewId = 'router-'
    // set router position when load instance 
    constructor(routerIndex, position) {
        console.log('Load Router')
        if (!isNaN(position)) this.position = position;
        if (!isNaN(routerIndex)) this.routerIndex = routerIndex;
        this.viewId += routerIndex;
        console.log(`Router index -  ${this.routerIndex} Position - ${this.position}`)
        this.setPosition(this.position)
        this.setTouchEvent()
    }

    setTouchEvent() {

        document.getElementById(`${this.viewId}-plus`).addEventListener("click", ()=>{
            this.position = this.position +1 > 25 ? 0 : this.position+1;
            console.log('plus- ',this.position)
            this.setPosition(this.position)
        })
        document.getElementById(`${this.viewId}-minus`).addEventListener("click", ()=>{
            this.position = this.position -1 < 0 ? 25 : this.position-1;
            this.setPosition(this.position)
            console.log('minus - ',this.position)
        })

    }
    // change router position by one
    setRouterNewPosition() {
        this.position++;
        let fullSpin = false;
        if (this.position > 25) {
            this.position -= 26;
            fullSpin = true;
        }
        this.setPosition(this.position)
        return fullSpin;
    }
    setPosition(newPosition) {
        this.position = newPosition;
        let lestPos = this.position -1 < 0 ? 25 : this.position-1;
        let nextPos = this.position +1 > 25 ? 0 : this.position+1;
        // document.getElementById(`${this.viewId}-pos-prev`).innerHTML = lestPos;
        document.getElementById(`${this.viewId}-pos`).innerHTML = this.position;
        // document.getElementById(`${this.viewId}-pos-next`).innerHTML = nextPos;
    }
    reversPosition() {
        this.position -= 1;
        this.position = this.position < 0 ? 25 : this.position;
        console.log(`revers Pos = ${this.position}`)
        this.setPosition(this.position)
    }

    //return router new index;
    getLetterNewPosition(oldLetterIndex, isToReflector) {
        console.log(` Pos = ${this.position}`)
        let NewLetterPosition;
        let wiring = this.getRouterScrambleArray(this.routerIndex);
        if (isToReflector) {
            oldLetterIndex = (oldLetterIndex + this.position) % 26;
            NewLetterPosition = wiring[oldLetterIndex];
        } else {
            let findReversIndex = wiring.findIndex((e) => e == oldLetterIndex)
            NewLetterPosition = findReversIndex - this.position;
            NewLetterPosition = NewLetterPosition < 0 ? NewLetterPosition + 26 : NewLetterPosition;
            NewLetterPosition = NewLetterPosition = NewLetterPosition % 26;

        }
        return NewLetterPosition
    }

    // getRouterWiring by router index
    getRouterScrambleArray(RouterIndex) {
        switch (RouterIndex) {
            case 0:
                return [8, 12, 4, 19, 2, 6, 5, 17, 0, 24, 18, 16, 1, 25, 23, 22, 11, 7, 10, 3, 21, 20, 15, 14, 9, 13];
            case 1:
                return [4, 7, 17, 21, 23, 6, 0, 14, 1, 16, 20, 18, 8, 12, 25, 5, 11, 24, 13, 22, 10, 19, 15, 3, 9, 2];
            case 2:
                return [25, 14, 20, 4, 18, 24, 3, 10, 5, 22, 15, 2, 8, 16, 23, 7, 12, 21, 1, 11, 6, 13, 9, 17, 0, 19];
        }
    }

}
