function MainModel() {}

MainModel.prototype.getData = function(data) {
    return data;
}

MainModel.prototype.getProductById = function(array) {
    return array.find(good => good.id == location.search.slice(4));
}

export default MainModel;
