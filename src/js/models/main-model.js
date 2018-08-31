class MainModel {
    constructor() {

    }

    getData(data) {
        return data;
    }

    getProductById(data) {
        let idAndCategory = location.search.split('&');
        let category = idAndCategory[1].slice(9);
        data = data[`category${category}`];
        return data.find(good => good.id == idAndCategory[0].slice(4));
    }

    getProductsListForCategory(data) {
        let category = location.search.slice(4);
        return data = data[category];
    }
}


export default MainModel;
