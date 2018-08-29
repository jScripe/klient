import '../scss/blocks/main.scss';
import App from './app';
import Cart from './services/cart-service'
import createHistory from 'history/createBrowserHistory';
import height from './myScripts/height.js';
import icoForMobile from './myScripts/ico-for-mobile.js';
// import popup from './myScripts/popup.js';
import showHideBlock from './myScripts/show-hide-block.js';
import showListOrGrid from './myScripts/show-list-or-grid.js';
// import slider from './myScripts/slider.js';


const history = createHistory();

var app = new App();
let cart = new Cart();

app.renderPage(history, cart);

history.listen((location, action) => {
    app.renderPage(history, cart);
});


height();
icoForMobile();

showHideBlock();
showListOrGrid();
// popup();
// slider();