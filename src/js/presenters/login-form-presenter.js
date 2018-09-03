import loginForm from '../views/tempLoginForm.hbs';

class LoginForm {
    constructor(history) {
        this.history  = history;
    }
    
    init() {
        this.render(loginForm([]));
    }

    render(compiledTemplate) {
        this.elem = document.getElementById('login-form-root');
        this.elem.innerHTML = compiledTemplate;
    }

    clean() {
        
    }
}


export default LoginForm;