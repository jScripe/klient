import footer from '../views/tempFooter.hbs';

function Footer(history) {
    this.history  = history;
}

Footer.prototype.render = function(compiledTemplate) {
    this.elem = document.getElementById('footer-root');
    this.elem.innerHTML = compiledTemplate;
}

Footer.prototype.init = function() {
    this.render(footer([]));
}

export default Footer;