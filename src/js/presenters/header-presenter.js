import header from '../views/tempHeader.hbs';

function Header(history) {
    this.history  = history;
}

Header.prototype.render = function(compiledTemplate) {
    this.elem = document.getElementById('header-root');
    this.elem.innerHTML = compiledTemplate;
}

Header.prototype.clickForLogo = function() {
    this.logo = document.querySelector('.header__logo-holder')
    this.logo.addEventListener('click', (function() {
        this.history.push(`/`);
    }).bind(this))
}

Header.prototype.init = function() {
    this.render(header([]));
    this.clickForLogo();
}

Header.prototype.clean = function() {
    this.element.innerHTML = '';
}

export default Header;