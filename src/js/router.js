import HomePage from './presenters/home-page-presenter';
import NavAndItems from './presenters/nav-and-items-presenter';


function Router() {
    this.currentPreseners = [];
}

Router.prototype.clean = function () {
    this.currentPreseners.forEach(elem => {
        elem.clean();
    });
}

Router.prototype.dispatch = function(history) {

    if (history.location.pathname === '/') {
        this.clean();
        this.currentPreseners = [new HomePage(history)];
        return this.currentPreseners;
    }

    if (history.location.pathname === '/categories') {
        this.currentPreseners = [new NavAndItems(history)];
        return this.currentPreseners;
    }

    return [];
}

export default Router;
