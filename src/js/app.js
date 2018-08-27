import Router from './router';
import forEach from 'lodash/forEach';

function App() {
    this.router = new Router();
    this.blocks = [];
}

App.prototype.renderPage = function(hash) {
    this.blocks = this.router.dispatch(hash);
    if (this.blocks) {
        forEach(this.blocks, function(block) {
            block.init();
        });
    }
}

export default App;

