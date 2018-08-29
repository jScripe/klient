import { goods } from "../models/goods";

export default class Cart  {
    constructor(){
        this.products = [];
        this.totalPrice = 0;
    }
    
    add(event) {
        this.idGoods = event.currentTarget.dataset.id;
        this.categoryGoods = event.currentTarget.dataset.category;
        this.products.push((goods[`category${this.categoryGoods}`])[0]);
        console.log(this.products);
    }

    remove() {
        
    }

    // remove(idOfProduct) {
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (idOfProduct == this.products[i].id) {
    //             this.products = pull(this.products, this.products[i]);
    //           this.sum(); 
    //         }
    //     }
    // }
    // sum() {
    //     this.totalPrice = this.products.reduce(function(sum, current) {
    //         return sum + current.price;
    //       }, 0);
       
    // }
};