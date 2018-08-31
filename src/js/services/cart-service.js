import { goods } from "../models/goods";

export default class Cart  {
    constructor(){
        this.products = [];
        this.totalPrice = 0;
        this.check = false;
    }
    
    add(event) {
        // this.idGoods = event.currentTarget.dataset.id;
        // this.categoryGoods = event.currentTarget.dataset.category;
        // this.products.push((goods[`category${this.categoryGoods}`])[this.idGoods - 1]);

        this.idGoods = event.currentTarget.dataset.id;
        this.categoryGoods = event.currentTarget.dataset.category;

        if(this.products.length == 0) {
            this.products.push((goods[`category${this.categoryGoods}`])[this.idGoods - 1]);
        } else {
            this.checkForMatches();
        }
    }

    checkForMatches(event) {
        this.check = true;
        this.products.forEach((item) => {
            if(item.id == this.idGoods && item.category == this.categoryGoods) {
                item.currentValue += 1;
                item.current = this.current;
                this.check = false;
            }
        });
        if(this.check) {
            this.products.push((goods[`category${this.categoryGoods}`])[this.idGoods - 1]);
        }
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