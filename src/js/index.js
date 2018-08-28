import '../scss/blocks/main.scss';
import App from './app';
import createHistory from 'history/createBrowserHistory';
import height from './myScripts/height.js';
import icoForMobile from './myScripts/ico-for-mobile.js';
import popup from './myScripts/popup.js';
import showHideBlock from './myScripts/show-hide-block.js';
import showListOrGrid from './myScripts/show-list-or-grid.js';
import slider from './myScripts/slider.js';


const history = createHistory();

var app = new App();

app.renderPage(history);

history.listen((location, action) => {
    app.renderPage(history);
});


height();
icoForMobile();
popup();
showHideBlock();
showListOrGrid();
// slider();