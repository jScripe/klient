function MainModel() {}

MainModel.prototype.getData = function(data) {
    return data;
}

MainModel.prototype.getProductById = function(data) {
    let category = location.hash.slice(1);
    data = data[`category${category}`];
    return data.find(good => good.id == location.search.slice(4));
}

// MainModel.prototype.getProductsListForCategory = function(data) {
//     let category = location.search.slice(4);
//     return data = data[category];
// }

export default MainModel;
