function Presenter() {
    this.element = document.getElementById('root');
}

Presenter.prototype.render = function(compiledTemplate) {
    this.element.innerHTML = compiledTemplate;
}

export default Presenter;
