class PlugBoard {

    cables = ['red', 'green', 'blueviolet', 'browne', 'purple', 'pink', 'yellow', 'blue', 'gray', 'orange'];
    pairs = [{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},{connect: null},];
    keyboard = document.getElementById('keyBoard')
    constructor(letters) {
        this.setLettersEvents();
        this.letters = letters;
    }

    getIndexByLetter(letter) {
        let letterIndex = this.letters.findIndex((e) => e == letter.toLowerCase());
        return letterIndex;
    }
    getLetterByIndex(index) {
        if (isNaN(index)) return;
        if (index % 0 !== 0 && index < 0 && index > 25) return;
        return this.letters[index];
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", JSON.stringify({
            from_id: ev.path[1].id ? ev.path[1].id : null,
            from_letter: ev.path[1].id ? ev.path[1].id.split("key-")[1] : null,
            dot_class: ev.target.className,
        }));
        
        if (ev.path.length > 0 && ev.path[1].id == 'trash') {
            ev.target.setAttribute('id', 'remove')
        }
    }

    drop(ev) {
        ev.preventDefault();
        let dropData = ev.dataTransfer.getData("text")
        dropData = JSON.parse(dropData);
        let to = ev.target.innerHTML;
        this.setConnection(dropData.from_letter, to, dropData.dot_class)
        if (dropData.from_id == 'trash') {
            document.getElementById('remove').remove();
        }
    }
    getPair(letterIndex){
        if(!isNaN(letterIndex)) return this.pairs[letterIndex].connect;
        else return null;
    }
    setPair(toIndex,fromIndex){
        this.pairs[toIndex] = {
            connect: fromIndex
        }
        this.pairs[fromIndex] = {
            connect: toIndex
        }
    }
    manageOldConnection(oldConnectionIndex){
        let oldLetter = this.getLetterByIndex(oldConnectionIndex)
        oldLetter = oldLetter.toUpperCase();
        let oldId = `key-${oldLetter}`;

        let newElement = document.createElement("p");
        newElement.innerHTML = oldLetter;
        let oldElement = document.getElementById(oldId)
        oldElement.innerHTML = '';
        oldElement.appendChild(newElement)
    }
    manageDoubleConnection(element,DivClass){
        let oldConnection = element.getElementsByClassName('dot');
        let oldClass = oldConnection[0].className;
        oldConnection[0].className = DivClass;
        this.setDot(oldClass,document.getElementById('trash'));
    }
    setConnection(from, to, DivClass) {
        let oldConnectionIndex, fromIndex;
        if (from) {
            fromIndex = this.getIndexByLetter(from);
            oldConnectionIndex = this.pairs[fromIndex].connect;
            if (oldConnectionIndex) {
                this.pairs[oldConnectionIndex] = {
                    connect: null
                }
            }
        }
        let toIndex = this.getIndexByLetter(to);
        let newLetterId = `key-${to}`;
        let newLetterElement = document.getElementById(newLetterId);
        if (!isNaN(fromIndex)) this.setPair(toIndex,fromIndex);

        if (oldConnectionIndex) this.manageOldConnection(oldConnectionIndex,DivClass);

        if (newLetterElement && newLetterElement.getElementsByClassName('dot') 
            && newLetterElement.getElementsByClassName('dot').length) {
            this.manageDoubleConnection(newLetterElement);
        }
            this.setDot(DivClass,newLetterElement);

    }
    setDot(dotClass,parent){
        let newDot = document.createElement("div");
        this.setAttributeDraggable(newDot,true)
        this.setEventDrag(newDot)
        newDot.className = dotClass;
        parent.appendChild(newDot);
    }
    
    onDrag(e) {
        e.preventDefault();
    }
    setLettersEvents() {
        let keys = this.keyboard.children;
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (key.className.includes('key')) {
                key.addEventListener('dragover', (e) => this.allowDrop(e))
                key.addEventListener('drop', (e) => this.drop(e))
            }
            let dot = key.children;
            for (let index = 0; index < dot.length; index++) {
                const element = dot[index];
                if (element.className.includes('dot')) {
                    this.setAttributeDraggable(element,true)
                    this.setEventDrag(element)
                }

            }
        }
    }
    setAttributeDraggable(element,active){
        element.setAttribute('draggable', active)
    }
    setEventDrag(element){
        element.addEventListener('drag', (e) => this.onDrag(e))
        element.addEventListener('dragstart', (e) => this.drag(e))
    }
}