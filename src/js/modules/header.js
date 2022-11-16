//Меню-бургер
let header = document.querySelector('.header');
let burger = document.querySelector('.burger__body');
burger.addEventListener('click', () => {
	burger.classList.toggle('burger__active');
	header.classList.toggle('header__active');
});


//heder, при авторизации аккаунта
	let authorizedInner =  `
		<div class="login__registered registered">
			<div class="registered__logo"></div>
			<div class="registered__account">
				<h4 class="registered__title">Profile</h4>
				<div class="registered__menu">
					<ul class="registered__list">
						<li class="registered__item my__profile">
							<a href="profile.html" class = "registered__item-link">
								<div class="registered__img registered__man"></div>
								<p>My profile</p>
							</a>
						</li>
						<li class="registered__item logout">
							<a href="index.html" class = "registered__item-link">
								<div class="registered__img registered__arrow"></div>
								<p>Logout</p>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	`;

//heder, при регистрации аккаунта
let registerInner = 	`
		<button class="login__button open__login">Log in</button>
		<div class="login__mobile">
			<button class="login__mobile-button open__login">Login</button>
			<button class="login__mobile-button open__sign">Sign up</button>
		</div>
	`;

//заносим оба варианта header в LS, дабы при перезагрузки сайта - отображалось корректно
localStorage.setItem('authorizedInner', authorizedInner);
localStorage.setItem('registerInner', registerInner);

let otherLogin = document.querySelector('.other__login');
    //если пользователь авторизован, то innerHTML authorizedInner
	if (localStorage.getItem('nowUser')) {
		otherLogin.innerHTML = localStorage.getItem('authorizedInner');
        
	//если пользователь не авторизован, то innerHTML registerInner
	} else if (!localStorage.getItem('nowUser')) {
		otherLogin.innerHTML = localStorage.getItem('registerInner');
	}
