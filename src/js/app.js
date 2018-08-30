import Router from './router';
import forEach from 'lodash/forEach';

class App {
    constructor() {
        this.router = new Router();
        this.blocks = [];
    }
    
    renderPage(hash, cart) {
        this.blocks = this.router.dispatch(hash, cart);
        if (this.blocks) {
            forEach(this.blocks, function(block) {
                block.init();
            });
        }
    }
}


export default App;

