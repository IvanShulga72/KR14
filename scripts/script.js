window.onload = function () {

    $('.under-input').hide();

    const fullName = document.getElementById('full-name');
    const userName = document.getElementById('username');
    const btn = document.getElementById('btn');
    const pass = document.getElementById('password');
    const repPass = document.getElementById('rep-password');
    const rights = document.getElementById('rights');
    const mail = document.getElementById('mail');
    const formLink = document.querySelector('.form-link');

    // fullName.onkeydown = (event) => {
    //     if (parseInt(event.key)) {
    //         return false;
    //     }
    // }
    // userName.onkeydown = (event) => {
    //     if (event.key === '.' || event.key === ',') {
    //         return false;
    //     }
    // }
    // rights.onchange = (event) => {
    //     if (event.target.checked) {
    //         console.log('Согласен');
    //     } else {
    //         console.log('Не согласен');
    //     }
    //
    // }
    btn.onclick = (event) => {

        $('.input').css('border-color', 'transparent');
        $('.input').css('border-bottom', '1px solid #C6C6C4');
        $('.under-input').css('display', 'none');
        let flag = true;

        if (!fullName.value.match(/^[a-zа-яё\s]+$/i)) {  //!fullName.value.match(/[\w\s]+/i) так почему-то не работает \w
            flag = false;
            fullName.style.borderColor = 'red';
            fullName.nextElementSibling.style.display = 'block';
        }
        if (!userName.value.match(/[a-zа-яё\d_\-\s]+/i)) {
            flag = false;
            userName.style.borderColor = 'red';
            userName.nextElementSibling.style.display = 'block';
        }
        if (!mail.value.match(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/)) { //скопированно с методички
            flag = false;
            mail.style.borderColor = 'red';
            mail.nextElementSibling.style.display = 'block';
        }
        if (!pass.value) { //не понимаю где неправильно .match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
            flag = false;
            pass.style.borderColor = 'red';
            pass.nextElementSibling.style.display = 'block';
        }
        if (!repPass.value) { //не понимаю где неправильно .match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
            flag = false;
            repPass.style.borderColor = 'red';
            repPass.nextElementSibling.style.display = 'block';
        }
        if (!(repPass.value === pass.value)) {
            flag = false;
            repPass.style.borderColor = 'red';
            repPass.nextElementSibling.style.display = 'block';
            pass.style.borderColor = 'red';
            pass.nextElementSibling.style.display = 'block';
            repPass.nextElementSibling.innerText = "Не совпадают пароли";
        }
        if (!rights.checked) {
            flag = false;
            rights.parentElement.nextElementSibling.style.display = 'block';
        }

        if (flag) {
            document.getElementsByClassName('pop-up')[0].style.display = 'flex';
            client = {
                fullName: fullName.value,
                userName: userName.value,
                mail: mail.value,
                password: pass.value,
                rights: rights.value
            }
            let clientsArray = [];
            let clients = localStorage.getItem('clients');
            if (clients) {
                clientsArray = JSON.parse(clients);
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

    function loginPage(event) {
        $('.input').css('border-color', 'transparent');
        $('.input').css('border-bottom', '1px solid #C6C6C4');
        $('.under-input').css('display', 'none');
        document.querySelector('.title').innerText = 'Log in to the system';
        btn.innerText = 'Sign In';
        fullName.parentElement.remove();
        mail.parentElement.remove();
        repPass.parentElement.remove();
        rights.parentElement.remove();
        formLink.innerText = "Registration";

        formLink.onclick = () => {
            location.reload();
        };

        document.querySelector('.order').reset();

        btn.onclick = (event) => {

            let clientsArray = JSON.parse(localStorage.getItem('clients'))
            let flagUserName = false;
            let flagPassword = false;
            let fullNameClient;
            for (let i = 0; i < clientsArray.length; i++) {
                if (clientsArray[i].userName === userName.value) {
                    flagUserName = true;
                    if (clientsArray[i].password === pass.value) {
                        flagPassword = true;
                    }
                }
                fullNameClient = clientsArray[i].fullName;
                break;
            }
            if (!flagUserName) {
                userName.style.borderColor = 'red';
                userName.nextElementSibling.style.display = 'block';
                userName.nextElementSibling.innerHTML = 'Такой пользователь не зарегистрирован';
            }
            if (!flagPassword) {
                pass.style.borderColor = 'red';
                pass.nextElementSibling.style.display = 'block';
                pass.nextElementSibling.innerHTML = 'Неверный пароль';
            }
            if (!userName.value.match(/[a-zа-яё\d_\-\s]+/i)) {
                flag = false;
                userName.style.borderColor = 'red';
                userName.nextElementSibling.style.display = 'block';
                userName.nextElementSibling.innerHTML = 'Заполните Your username<br>Your username - может содержать только буквы, цифры, символ подчеркивания и тире';
            }
            if (!pass.value) { //не понимаю где неправильно .match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
                flag = false;
                pass.style.borderColor = 'red';
                pass.nextElementSibling.style.display = 'block';
                pass.nextElementSibling.innerHTML = "Заполните Password <br>Поле пароля должно содержать минимум 8 символов, среди которых есть: <br>- хотя бы одна буква в верхнем регистре <br>- хотя бы одна цифра <br>- хотя бы один спецсимвол;"
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
}

