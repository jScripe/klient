import HomePage from './presenters/home-page-presenter';
import NavAndItems from './presenters/nav-and-items-presenter';
import Header from './presenters/header-presenter';
import Footer from './presenters/footer-presenter';
import LoginForm from './presenters/login-form-presenter';
import ItemPage from './presenters/product-presenter';
import CartPage from './presenters/cart-presenter';
import AddressPage from './presenters/address-presenter';
import PaymentPage from './presenters/payment-presenter';


class Router {
    constructor() {
        this.currentPreseners = [];
    }
    
    dispatch(history, cart) {
        if (history.location.pathname === '/') {
            this.clean();
            this.currentPreseners = [new HomePage(history)];
            this.currentPreseners.push(new Header(history));
            this.currentPreseners.push(new Footer(history));
            this.currentPreseners.push(new LoginForm(history));
            return this.currentPreseners;
        }

        if (history.location.pathname === '/categories') {
            this.clean();
            this.currentPreseners = [new NavAndItems(history, cart)];
            return this.currentPreseners;
        }

        if(history.location.pathname === '/product') {
            this.clean();
            this.currentPreseners = [new ItemPage(history, cart)];
            return this.currentPreseners;
        }

        if(history.location.pathname === '/cart') {
            this.clean();
            this.currentPreseners = [new CartPage(history, cart)];
            return this.currentPreseners;
        }

        if(history.location.pathname === '/address') {
            this.clean();
            this.currentPreseners = [new AddressPage(history)];
            return this.currentPreseners;
        }

        if(history.location.pathname === '/payment') {
            this.clean();
            this.currentPreseners = [new PaymentPage(history)];
            return this.currentPreseners;
        }

        return [];
    }

    clean() {
        this.currentPreseners.forEach(elem => {
            elem.clean();
        });
    }
}



export default Router;
