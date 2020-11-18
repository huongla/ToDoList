var Validation = function(){
    this.checkNull = function(value,selectorError){
        if(value.trim()===''){
            document.querySelector(selectorError).innerHTML = `Please add a task`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = ``;
        return true;
    }
}