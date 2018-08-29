import Presenter from './presenter';
import cartPage from '../views/tempCartPage.hbs';

function CartPage(history, cart) {
    Presenter.apply(this, arguments);
    this.history = history;
    this.cart = cart;
}

CartPage.prototype = Object.create(Presenter.prototype);
CartPage.prototype.constructor = CartPage;

CartPage.prototype.init = function() {
    this.render(cartPage(this.cart.products));
}


export default CartPage;