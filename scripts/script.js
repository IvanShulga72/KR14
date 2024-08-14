window.onload = function () {

    if(!localStorage.getItem('clients')) {
        localStorage.setItem('clients', '[]');
    }

    const fullName = document.getElementById('full-name');
    const userName = document.getElementById('username');
    const btn = document.getElementById('btn');
    const pass = document.getElementById('password');
    const repPass = document.getElementById('rep-password');
    const rights = document.getElementById('rights');
    const mail = document.getElementById('mail');
    const formLink = document.querySelector('.form-link');

    btn.onclick = (event) => {

        dontShowUnderText();
        let flag = true;

        if (!fullName.value) {
            redAndBlock(fullName);
            flag = false;
        } else if (!fullName.value.match(/^[a-zа-яё\s]+$/i)) {
            redAndBlock(fullName);
            flag = false;
            fullName.nextElementSibling.innerText = 'Full Name может содержать только буквы и пробел';
        }

        if (!userName.value) {
            redAndBlock(userName);
            flag = false;
        } else if (!userName.value.match(/^[a-zа-яё0-9_\-\s]+$/i)) {
            redAndBlock(userName);
            flag = false;
            userName.nextElementSibling.innerText = 'Your username может содержать только буквы, цифры, символ подчеркивания и тире';
        }

        if (!mail.value) {
            redAndBlock(mail);
            flag = false;
        } else if (!mail.value.match(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/)) { //скопированно с методички
            redAndBlock(mail);
            flag = false;
            mail.nextElementSibling.innerText = 'Невалидный E-mail';
        }

        if (!pass.value) {
            redAndBlock(pass);
            flag = false;
        } else if (!pass.value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/)) {
            redAndBlock(pass);
            flag = false;
            pass.nextElementSibling.innerText = 'Поле пароля должно содержать минимум 8 символов, среди которых есть:\n' +
                '- хотя бы одна буква в верхнем регистре\n' +
                '- хотя бы одна цифра\n' +
                '- хотя бы один спецсимвол';
        }

        if (!repPass.value) {
            redAndBlock(repPass);
            flag = false;
        }

        if (pass.value && repPass.value && !(repPass.value === pass.value)) {
            redAndBlock(pass);
            redAndBlock(repPass);
            flag = false;
            repPass.nextElementSibling.innerText = "Не совпадают пароли";
        }

        if (!rights.checked) {
            flag = false;
            rights.parentElement.nextElementSibling.style.display = 'block';
        }

        if (flag) {
            document.getElementsByClassName('pop-up')[0].style.display = 'flex';
            let clientsArray = [];
            let client = {
                fullName: fullName.value,
                userName: userName.value,
                mail: mail.value,
                password: pass.value,
                rights: rights.value
            }
            console.log(client);
            let clients = localStorage.getItem('clients');
            console.log(clients);
            if (clients) {
                clientsArray = JSON.parse(clients);
                console.log(clientsArray);
            }
            clientsArray.push(client);
            localStorage.setItem('clients', JSON.stringify(clientsArray));
        }
        //event.preventDefault(); // не помню зачем это стояло в конце кода

    }

    document.querySelector('.pop-up__btn').onclick = (event) => {
        document.querySelector('.pop-up').style.display = 'none';
        loginPage();
    };

    formLink.onclick = () => {
        loginPage();
    }

    function loginPage() {
        dontShowUnderText()
        document.querySelector('.title').innerText = 'Log in to the system';
        btn.innerText = 'Sign In';
        fullName.parentElement.remove();
        mail.parentElement.remove();
        repPass.parentElement.remove();
        rights.parentElement.parentElement.remove();
        formLink.innerText = "Registration";
        document.querySelector('.order').reset();

        formLink.onclick = () => {
            location.reload();
        };

        btn.onclick = (event) => {
            dontShowUnderText();

            if (!userName.value) {
                redAndBlock(userName);
            }
            else if (!userName.value.match(/^[a-zа-яё0-9_\-\s]+$/i)) {
                redAndBlock(userName);
                userName.nextElementSibling.innerText = 'Your username может содержать только буквы, цифры, символ подчеркивания и тире';
            }

            if (!pass.value) {
                redAndBlock(pass);
            }
            else if (!pass.value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/)) {
                redAndBlock(pass);
                pass.nextElementSibling.innerText = 'Поле пароля должно содержать минимум 8 символов, среди которых есть:\n' +
                    '- хотя бы одна буква в верхнем регистре\n' +
                    '- хотя бы одна цифра\n' +
                    '- хотя бы один спецсимвол';
            }

            let clientsArray = JSON.parse(localStorage.getItem('clients'))
            let flagUserName = false;
            let flagPassword = false;
            let fullNameClient;
            for (let i = 0; i < clientsArray.length; i++) {
                console.log(clientsArray[i].userName);
                if (clientsArray[i].userName === userName.value) {
                    flagUserName = true;
                    console.log(clientsArray[i].password);
                    if (clientsArray[i].password === pass.value) {
                        flagPassword = true;
                        fullNameClient = clientsArray[i].fullName;
                        break;
                    }
                }
            }

            if (userName.value && !flagUserName) {
                redAndBlock(userName);
                userName.nextElementSibling.innerHTML = 'Такой пользователь не зарегистрирован';
            }

            if (pass.value && flagUserName && !flagPassword) {
                redAndBlock(pass);
                pass.nextElementSibling.innerHTML = 'Неверный пароль';
            }

            if (flagUserName && flagPassword) {
                personalAccount(fullNameClient);
            }

        }
    }

    function personalAccount(fullNameClient) {
        document.querySelector('.title').innerText = 'Welcome, ' + fullNameClient + '!';
        btn.innerText = 'Exit';
        btn.onclick = () => {
            location.reload();
        }
        userName.parentElement.remove();
        pass.parentElement.remove();
        formLink.remove();
    }

    function redAndBlock(item) {
        item.style.borderColor = 'red';
        item.nextElementSibling.style.display = 'block';
    }

    function dontShowUnderText () {
        $('.input').css('border-color', 'transparent');
        $('.input').css('border-bottom', '1px solid #C6C6C4');
        $('.under-input').css('display', 'none');
    }
}

