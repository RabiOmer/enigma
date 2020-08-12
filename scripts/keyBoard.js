class KeyBoard {
    keyBoardView = document.getElementById('keyBoard')
    constructor(){
        this.setKeyBoard()
    }

    setKeyBoard(){
        for (let index = 0; index < this.keyBoardView.children.length; index++) {
            let letter = this.keyBoardView.children[index];
            console.log(letter)
            if(this.hasClass(letter,'key')){
                let newID = 'key-'+letter.getElementsByTagName('p')[0].innerHTML;
                letter.setAttribute('id',newID);
                this.setClass(letter,'light')
            }
        }
        
    }
    isPressed(key){
        let id = 'key-'+key.toLocaleUpperCase();
        let HtmlKey = document.getElementById(id);
        this.removeClass(HtmlKey,'light')
        setTimeout(()=>{
            this.setClass(HtmlKey,'light')
        },500)
    }
    hasClass(element,className) {
        return !!element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
      }
      
    setClass(element,className) {
        if (!this.hasClass(element,className)) element.className += " "+className;
      }
      
    removeClass(element,className) {
        if (this.hasClass(element,className)) {
          var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
          element.className=element.className.replace(className,' ');
        }
      }
    
}