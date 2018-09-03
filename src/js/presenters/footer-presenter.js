import footer from '../views/tempFooter.hbs';


class Footer {
    constructor(history) {
        this.history  = history;
    }
    
    render(compiledTemplate) {
        this.elem = document.getElementById('footer-root');
        this.elem.innerHTML = compiledTemplate;
    }

    init() {
        this.render(footer([]));
    }

    clean() {
        
    }
}


export default Footer;