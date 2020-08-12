class EndPoint {
    endPointView = document.getElementById('textResult');
    text = '';

    constructor(){}

    clearAll(){
        this.text = "";
        console.log(this.endPointView.innerHTML)
        this.endPointView.innerHTML ="";
    }
    setValue(key){
        if(this.text.length == 0 && key == ' ') return;
        if(key == ' ' && this.text[this.text.length-1] == ' ') return
        this.text += key;
        this.endPointView.innerHTML = this.endPointView.innerHTML + key;
    }
    clearLastValue(){
        if(this.text.length == 0) return;
        if(this.text[this.text.length-1] == ' ') {
            console.log('text = ',this.text)
            this.text = this.text.slice(0, -1);
            this.endPointView.innerHTML = this.text;
            return false;
        }
        else if(this.text[this.text.length-1] != ' ') {
            this.text = this.text.slice(0, -1);
            console.log('text = ',this.text)
            this.endPointView.innerHTML = this.text;
            return true;
        }
    }
}