class MainModel {
    constructor() {

    }

    getData(data) {
        return data;
    }

    getProductById(data) {
        let category = location.hash.slice(1);
        data = data[`category${category}`];
        return data.find(good => good.id == location.search.slice(4));
    }

    getProductsListForCategory(data) {
        let category = location.search.slice(4);
        return data = data[category];
    }
}


export default MainModel;
