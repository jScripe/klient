import HomePage from './presenters/home-page-presenter';
import NavAndItems from './presenters/nav-and-items-presenter';
import Header from './presenters/header-presenter';
import Footer from './presenters/footer-presenter';
import LoginForm from './presenters/login-form-presenter';
import ItemPage from './presenters/product-presenter';
import CartPage from './presenters/cart-presenter';


function Router() {
    this.currentPreseners = [];
}

// Router.prototype.clean = function () {
//     this.currentPreseners.forEach(elem => {
//         elem.clean();
//     });
// }

Router.prototype.dispatch = function(history, cart) {

    if (history.location.pathname === '/') {
        // this.clean();
        this.currentPreseners = [new HomePage(history)];
        this.currentPreseners.push(new Header(history));
        this.currentPreseners.push(new Footer(history));
        this.currentPreseners.push(new LoginForm(history));
        return this.currentPreseners;
    }

    if (history.location.pathname === '/categories') {
        // this.clean();
        this.currentPreseners = [new NavAndItems(history, cart)];
        return this.currentPreseners;
    }

    if(history.location.pathname === '/product') {
        // this.clean();
        this.currentPreseners = [new ItemPage(history)];
        return this.currentPreseners;
    }

    if(history.location.pathname === '/cart') {
        this.currentPreseners = [new CartPage(history, cart)];
        return this.currentPreseners;
    }

    return [];
}

export default Router;
