import { goods } from "../models/goods";

export default class Cart  {
    constructor(){
        this.products = [];
        this.totalPrice = 0;
        this.check = false;
    }
    
    add(event) {
        event.preventDefault();
        if(localStorage.getItem('token') === null) {
            alert('Для получения доступа к добавлению товаров и к корзине необходимо авторизоваться');
            return false;
        } else {
            this.idGoods = event.currentTarget.dataset.id;
            this.categoryGoods = event.currentTarget.dataset.category;
            this.tokenUser = JSON.parse(localStorage.getItem('token')).token;

            let data = {
                "id": this.idGoods,
                "categoryId": this.categoryGoods,
                "token": this.tokenUser
            }

            fetch('http://localhost:3000/api/cart', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } 
    }

    remove(event) {
        this.idDeleteGoods = +(event.currentTarget.dataset.id);
        this.categoryDeleteGoods = +(event.currentTarget.dataset.category);
        this.tokenUser = JSON.parse(localStorage.getItem('token')).token;

        let data = {
            "id": this.idDeleteGoods,
            "categoryId": this.categoryDeleteGoods,
            "token": this.tokenUser
        }
        
        fetch('http://localhost:3000/api/cart', {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

    }
};