import loginForm from '../views/tempLoginForm.hbs';

function LoginForm(history) {
    this.history  = history;
}

LoginForm.prototype.render = function(compiledTemplate) {
    this.elem = document.getElementById('login-form-root');
    this.elem.innerHTML = compiledTemplate;
}

LoginForm.prototype.init = function() {
    this.render(loginForm([]));
}

export default LoginForm;