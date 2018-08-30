import { goods } from "../models/goods";

export default class Cart  {
    constructor(){
        this.products = [];
        this.totalPrice = 0;
    }
    
    add(event) {
        this.idGoods = event.currentTarget.dataset.id;
        this.categoryGoods = event.currentTarget.dataset.category;
        this.products.push((goods[`category${this.categoryGoods}`])[this.idGoods - 1]);
    }

    remove(event) {
        this.idDeleteGoods = +(event.currentTarget.dataset.id);
        this.categoryDeleteGoods = +(event.currentTarget.dataset.category);
        this.indexToRemove =  this.products.findIndex((item) => {       
            return item.id === this.idDeleteGoods && item.category === this.categoryDeleteGoods;
        });
        this.products.splice(this.indexToRemove, 1);
    }
};