function LocalStorageService(){

}
LocalStorageService.prototype.create = function(key, value){
    let temp = [].concat(JSON.stringify(value));
    localStorage.setItem(key, temp);
}
LocalStorageService.prototype.read = function {
    let tmp = localStorage.getItem ;
    return JSON.parse(tmp);
}
LocalStorageService.prototype.update = function(key, value){
    let tmp = JSON.parse(localStorage.getItem );
    tmp.concat(value);
    localStorage.setItem(key, JSON.stringify(tmp));
}
LocalStorageService.prototype.delete = function {
    localStorage.removeItem ;
}
export default LocalStorageService;