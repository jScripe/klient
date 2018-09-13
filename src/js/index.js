import '../scss/blocks/main.scss';
import App from './app';
import Cart from './services/cart-service'
import createHistory from 'history/createBrowserHistory';
import height from './myScripts/height.js';


const history = createHistory();

var app = new App();
let cart = new Cart();

app.renderPage(history, cart);

history.listen((location, action) => {
    app.renderPage(history, cart);
});


height();

