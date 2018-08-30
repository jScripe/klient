class Presenter {
    constructor() {
        this.element = document.getElementById('root');
    }
    
    render(compiledTemplate) {
        this.element.innerHTML = compiledTemplate;
    }
}


export default Presenter;
