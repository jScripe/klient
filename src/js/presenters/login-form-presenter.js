import loginForm from '../views/tempLoginForm.hbs';

import { autobind } from 'core-decorators';


class LoginForm {
    constructor(history) {
        this.history  = history;
    }
    
    init() {
        this.render(loginForm([]));

        this.getButtonRegister();
        this.getButtonSignIn();
        this.getInputRegisterLogin();
        this.getInputRegisterPassword();
        this.getInputSignInLogin();
        this.getInputSignInPassword();
        this.getButtonToSignIn();
        this.getButtonToRegister();
        this.getButtonHideLoginForm();
        this.getIconSignIn();
        this.getIconSignOut();

        this.bindEvents();
    }

    render(compiledTemplate) {
        this.elem = document.getElementById('login-form-root');
        this.elem.innerHTML = compiledTemplate;
    }

    /////////////////////////

    getButtonRegister() {
        this.buttonRegister = document.querySelector('.registration-form__button')
    }

    getButtonSignIn() {
        this.buttonSignIn = document.querySelector('.login-form__button')
    }

    getInputRegisterLogin() {
        this.inputRegisterLogin = document.querySelector('.registration-form__email');
    }

    getInputRegisterPassword() {
        this.inputRegisterPassword = document.querySelector('.registration-form__password');
    }

    getInputSignInLogin() {
        this.inputSignInLogin = document.querySelector('.login-form__email');
    }

    getInputSignInPassword() {
        this.inputSignInPassword = document.querySelector('.login-form__password');
    }

    getButtonToSignIn() {
        this.buttonToSignIn = document.querySelector('.registration-form__reg');
    }

    getButtonToRegister() {
        this.buttonToRegister = document.querySelector('.login-form__reg');
    }

    getButtonHideLoginForm() {
        this.buttonHideLoginForm = document.querySelector('.registration-holder__close-modal');
    }

    getIconSignIn() {
        this.iconSignIn = document.querySelector('.header__quit');
    }

    getIconSignOut() {
        this.iconSignOut = document.querySelector('.header__sign-out');
    }

    //////////////////////////////

    bindEvents() {
        this.buttonRegister.addEventListener('click', this.handleButtonRegisterClick, false);
        this.buttonSignIn.addEventListener('click', this.handleButtonSignInClick, false);
    }

    @autobind
    handleButtonRegisterClick(event) {
        event.preventDefault();
        let username = this.inputRegisterLogin.value;
        let password = this.inputRegisterPassword.value;

        let data = {
            "username": username,
            "password": password
        }

        if (username === '' || password === '') {
            alert('Заполните пустые поля!')
        } else {
            fetch('http://localhost:3000/api/registration', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
            })
            .then((res) => {
                if(res.status === 409) {
                    throw new Error('Пользователь с таким логином уже существует');
                }
                return res.text();
            })
            .then((text) => {
                alert(text);
                this.buttonToSignIn.click();
            })
            .catch((error) => {
                alert(error);
            })
        }
        
    }

    @autobind
    handleButtonSignInClick(event) {
        event.preventDefault();
        let username = this.inputSignInLogin.value;
        let password = this.inputSignInPassword.value;

        let data = {
            "username": username,
            "password": password
        }

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if(res.status === 401) {
                throw new Error('Зарегистрируйтесь пожалуйста');
            } else if(res.status === 400) {
                throw new Error('Введённые данные не верны, повторите попытку');
            }
            return res.text();
        })
        .then((token) => {
            let data = {
                "token": token,
                "username": username
            }
            localStorage.setItem('token', JSON.stringify(data));
            this.buttonHideLoginForm.click();
            this.iconSignIn.style.display = 'none';
            this.iconSignOut.style.display = 'block';
        })
        .catch((error) => {
            alert(error);
            this.buttonToRegister.click();
        })
    }

    clean() {
        
    }
}


export default LoginForm;