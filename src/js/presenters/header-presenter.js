import header from '../views/tempHeader.hbs';

class Header {
    constructor(history) {
        this.history  = history;
    }

    init() {
        this.render(header([]));
        this.getLogo();
        this.bindEvents();
    }

    render(compiledTemplate) {
        this.elem = document.getElementById('header-root');
        this.elem.innerHTML = compiledTemplate;
    }

    getLogo() {
        this.logo = document.querySelector('.header__logo-holder');
    }
    
    bindEvents() {
        this.logo.addEventListener('click', this.handleLogoClick.bind(this), false);
    }

    handleLogoClick(event) {
        this.history.push('/');
    }

    clean() {
        this.element.innerHTML = '';
    }
}


export default Header;