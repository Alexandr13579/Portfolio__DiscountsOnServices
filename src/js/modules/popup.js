//если на страничке есть элемент main__pop-up, то разрешаем Login, Sign up, Buy
if (document.querySelector('.main__pop-up')) {

    //оболочка страницы 
    let wrapper = document.querySelector('.wrapper');
    
    //окно регистрации
    let signUp = document.querySelector('.sign__up');
    let createForm = signUp.querySelector('#create__form'); //форма регистрации
    let inputsSignUp = createForm.querySelectorAll('.input__account-create'); //inputs формы регистрации
    
    //окно авторизации
    let login = document.querySelector('.login');
    
    //окно если пользователь пробует повторно регистрироваться
    let alreadyRegistered = document.querySelector('.already__registered');
    
    //окно код из Email
    let emailCod = document.querySelector('.email__cod');
    let emailCodInput = emailCod.querySelector('input'); //инпут для SMS из email 
    
    //окно успешной регистрации
    let successfulRegist = document.querySelector('.successful__registr');
    
    //окно запроса доп.подписки
    let requestPop = document.querySelector('.request__pop')

    //окно support
    let supportList = document.querySelector('.support');

    //временный массив для занесения данных User в LS
    let arrayInputs = [];
        
    //через обработчик событий открываем, закрываем окна login и sing up
    wrapper.addEventListener('click', (event) => {
        //окно регистрации
        if ( event.target.closest('.open__sign')) {
            signUp.classList.add('active__window');
            login.classList.remove('active__window');
        
        //окно входа в учётку
        } else if ( event.target.closest('.open__login')) {
            login.classList.add('active__window');
            signUp.classList.remove('active__window');
        
        //выход из учётки
        } else if ( event.target.closest('.logout') ) {
            //удаляем LS текущего пользователя
            localStorage.removeItem('nowUser');
            //переходим на стартовую страницу
            document.location = "index.html";
            
        //окно выбора подписок на главной странице, блок main
        } else if (event.target.closest('.startuse__button')) {
            selectSubscriptionIndex();

        //выход из окна, если такой аккаунт уже существует
        } else if (event.target.closest('#already__registered-botton')) {
            alreadyRegistered.classList.remove('active__window');
            signUp.classList.remove('active__window');
            login.classList.add('active__window');

         //продолжение регистрации, код из майла не приходит(он есть сразу), высылаем снова(вводится в input сразу)
        } else if ( event.target.closest('.account__footer-code')) {
            emailCodInput.value = '4321';

        //продолжение регистрации, открываем окно Успешной Регистрации
        } else if (event.target.closest('#create__btn-code')) {
            emailCod.classList.remove('active__window');
            successfulRegist.classList.add('active__window'); 

        //окончание регистрации, закрываем окно, переход на profile.html
        } else if (event.target.closest('#continue__work')) {
            successfulRegist.classList.remove('active__window');
            window.location.href = 'profile.html';    

        //окно тех.поддержки
        } else if (event.target.closest('.faq__btn') || event.target.closest('#support__header')) {
            supportList.classList.add('active__window'); 
            //находим единственный инпут в окне
            let supportListInput = supportList.querySelector('input');
            //запускаем функцию
            supportClose(supportList, supportListInput);
        
        //окно запроса доп. подписки
        } else if (event.target.closest('.request__button')) {
            requestPop.classList.add('active__window');
            //инпуты окна запроса доп.подписок
            let requestPopInputs = requestPop.querySelectorAll('input');
            //функция проверки заполненности input
            requestChekInputsClose(requestPop, requestPopInputs);
        //footer, скролл до начала страницы
        } else if (event.target.closest('#footer__goup')) {
            window.scroll({
                top: 0,
                left: 0,
                behavior : "smooth"
            });
        //footer, ссылка на index.html
        } else if (event.target.closest('#footer__gohome')) {
            window.location = 'index.html'
        }
    });    

/*-----------Вход в систему уже зарегистрированного User------------------------------------------------------------*/

    //находим форму входа
    let loginForm = document.getElementById('login__form');
    //вешаем событие отправки формы
    loginForm.addEventListener('submit', (event) => {
        //отменяем событие браузера
        event.preventDefault();
    
        //находим input окна login формы
        let loginPassValue =  document.querySelector('#account__password-login').value;
        let loginEmailValue = document.querySelector('#account__email-login').value;
        
        //запускаем функцию проверки User, есть ли он в LS allUser
        if (checkUser1(loginPassValue, loginEmailValue)) {
            //переходим на стараницу profile.html
            window.location.href = "profile.html";
        
        //если такого User нет
        } else  {
            //окно 'not__registred' в окне Login
            let notRegistred = document.querySelector('.not__registred');
            //открываем окно 'not__registred'
            notRegistred.classList.add('active__window');
            //ставим обработчик событий на клик кнопки в появившимся окне, для возврата к окну Login
            notRegistredOpenLogin(notRegistred);
        }
    });
    

    //функция помощник при входе
    function checkUser1(loginPassValue, loginEmailValue) {
        //массив из всех сохранённых User в LS
        let loginAllUser = JSON.parse(localStorage.getItem('allUser'));
        
        // перебираем массив всех User, получаем email и password каждого
        for ( let item of loginAllUser) {
            //input - email и password каждого User из LS allUser сравниваем с введёнными данными в окне Login
            if (item[1] == loginEmailValue && item[2] == loginPassValue) {
                //записываем в LS User, который вошёл в систему
                localStorage.setItem('nowUser', JSON.stringify(item));
                return true
            } 
        }
        //если совпадений нет, то возвращаем false
        return false;
    }

    //функция помощник при входе
    function notRegistredOpenLogin(notRegistred) {
        //находим кнопку в окне not__registred и ставим обработчик событий на клик
        document.querySelector('#not__registred-button').addEventListener('click', () => {
            //скрываем окно
            notRegistred.classList.remove('active__window');
        })
    }

/*-----------Регистрация User, проверка - есть ли он в системе ------------------------------------------------------------*/

    //Окно регистрации, сохраняем данные User
    createForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
                //Проверяем все ли инпут заполнены 
                if ([...inputsSignUp].every( item => { if (item.value || item.checked) { return true}})) {
            
                    //все данные из инпут заливаем в временный массив
                    for (let i = 0; i < inputsSignUp.length; i++) {
                        arrayInputs.push(inputsSignUp[i].value);
                    }

                    //если в LS нет ключа 'allUser' - создаём новый и записываем нового User
                    if (!JSON.parse(localStorage.getItem('allUser'))) {

                        //сохраняем каждого User, как объект с данными
                        localStorage.setItem('allUser', JSON.stringify([{...arrayInputs}]));
                        //записываем User в текущего User
                        nowUser(arrayInputs);
                        //продолжаем регистрацию
                        continueRegistrUser();

                    //если ключ allUser существует, то сверяем нового User с созданными ранее на повторность, заносим нового User
                    } else if (JSON.parse(localStorage.getItem('allUser'))) {
                            
                        //получаем массив всех пользователей
                            let allUser = JSON.parse(localStorage.getItem('allUser'));
                            
                            //если в массиве нет этого User, то заносим его
                            if (!checkAllUser(allUser, arrayInputs)) {
                                
                                //записываем нового User в массив всех User и сохраняем в LS
                                allUser.push({...arrayInputs});
                                localStorage.setItem('allUser', JSON.stringify(allUser));
                                    //записываем User в текущего User, LS
                                    nowUser(arrayInputs);
                                    //продолжаем регистрацию
                                    continueRegistrUser();

                            //если в массиве такой User есть, то открываем окно останавливаем регистрацию
                            } else if(checkAllUser(allUser, arrayInputs)) {

                                //окно инфы о том, что аккаунт уже существует
                                alreadyRegistered.classList.add('active__window');
                                //сброс временного массива
                                arrayInputs.splice(0, arrayInputs.length);
                                //сброс введённых данных в форму регистрации на странице
                                createForm.reset();
                            }                           
                    }
                }
            })

    //проверка нового User в массиве всех Users
    function checkAllUser (allUser, newUser) {
        //перебираем массив со всеми User
        for (let item of allUser ) {
            //если email одинаковые, то выходим из функции
            if (item[2] == newUser[2]) {
                return true
            }
        }
        //если такого User нет в массиве всех User
        return false
    } 

    //функция сохранения текущего User в LS
    function nowUser(array) {
        localStorage.setItem('nowUser', JSON.stringify({...array}));
    }

    //функция помощник, закрываем окно ввода данных нового пользователя, открываем окно ввода смс, смс выводим сразу
    function continueRegistrUser () {
        emailCod.classList.add('active__window');
        signUp.classList.remove('active__window');
        emailCodInput.value = '1355';
    }
    
    //функция закрытия окон, через кнопку, IFFE
    (function closetPopUp() {

        //секция всплывающих окон в DOM
        let mainPopUp = document.querySelector('.main__pop-up');
        let articleMainPopUp = mainPopUp.querySelectorAll('article'); //все всплывающие окна
        let accountHeadBut = mainPopUp.querySelectorAll('.account__header-button'); //все кнопки выхода в всплывающих окнах

        articleMainPopUp.forEach( item => {
            //перебираем все всплывающие окна
            item.addEventListener('click', event => {
                //перебираем все кнопки
                for (let i = 0; i < accountHeadBut.length; i++) {
                    //если событие click произошло на кнопку выхода, то удаляем класс active__window у этого листа(убираем окно)
                    if (event.target == accountHeadBut[i]) {
                        item.classList.remove('active__window');
                    } 
                }
            })
        });
    })();
    
    //функция открытия листа выбора подписок через блок из main со страницы index
    function selectSubscriptionIndex() {
        //окно выбора подписок
        let selectSubscription = document.querySelector('.select__subscription');

        if (localStorage.getItem('nowUser')) {
            //открываем окно выбора подписок
            selectSubscription.classList.add('active__window');
    
            //Если User не заргистрирован, то открываем окно Login
            }  else if (!localStorage.getItem('nowUser')) {
                login.classList.add('active__window');
            }
    }

    //функция помощник в окне support
    function supportClose(supportList, supportListInput) {

        document.querySelector('#support__close-btn').addEventListener('click', (event) => {
            //отменяем стандартное поведение форы
            event.preventDefault();

            //если в инпуте окна есть данные - закрываем окно
            if (supportListInput.value) {
                supportList.classList.remove('active__window');     
                //делаем reset формы окна
                document.querySelector('.support-form').reset();
            //Если данных нет, ставим Focus на инпут
            } else {
                supportListInput.focus()
            }
        })
    }

    //функция помощник в окне Request
    function requestChekInputsClose(requestPop, requestPopInputs) {
        //ставим обработчик событий клик на форму окна Request
        document.querySelector('#request__pop-button').addEventListener('click', (event) => {
        //отменяем стандартное поведение форы
        event.preventDefault();

            //если все input заполнены, то зыкрываем окно
            if ([...requestPopInputs].every( item => { if (item.value) {return true}})) {
                requestPop.classList.remove('active__window');
                //делаем reset формы окна
                document.querySelector('.request__pop-form').reset();

            // если нет, то ставим фокус на не заполненные, каждый отдельно
            } else {
                for (let item of requestPopInputs) {

                    if (!item.value) {
                        item.focus();
                    }
                }
            }
        })
    }
}


