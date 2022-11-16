"use strict"

if (document.querySelector('.main__price')) {
    
//кнопки покупки подписок
let priceBlockButton = document.querySelectorAll('.price__block-button');
//окно оформление подписки и его лист
let buySelect = document.querySelector('.buy__select');
let buySelectList = buySelect.querySelector('#buy__select-list');

//текущий User
let nowUser = JSON.parse(localStorage.getItem('nowUser'));

//покупка подписки
priceBlockButton.forEach(item => {
	item.addEventListener('click', (event) => {
		//проверка на авторизованность Usera
		if (nowUser) {
		//через data- атрибут определяем какая кнопка была нажата, инициализируем её
		let selectSubscriptionButton = event.target.dataset.button;
		//через data- атрибут связываем карточку с кнопкой, получаем всё содержимое карточки 
		let selectSubscriptionList = document.querySelector(`[data-list ="${selectSubscriptionButton}"]`).innerHTML;
		
		//в лист окна оформления вписываем все данные выбранной карточки
		buySelectList.innerHTML = selectSubscriptionList;
		//кнопка Buy на листе окна
		let buyButton = buySelectList.querySelector('.price__block-button');
		//меняем текст на кнопке листа  
		buySelectList.querySelector('.price__block-button').innerHTML = 'Buy';
		//получаем sub-title карточки
		let subTitle = buySelectList.querySelector('.price__block-text').innerHTML;
		//заголовок листа
		let title = buySelectList.querySelector('.price__block-title');
		//заголовок страницы html > head > title
		let documentTitle = document.title;
		//меняем текст заголовка
		title.innerHTML = documentTitle + ' ' + title.innerHTML;
		//окно оформление подписки, открываем его
		buySelect.classList.add('active__window');

		//обработчик клика на кнопку, открываем следующее окно покупки
		openCloseBuyWindow(buyButton);

		//передаём все данные о выбранной подписке для сохранения в LS и оформления карточки в profile.html
		addSubscriptionProfile(title, subTitle, documentTitle);
		
		// если пользователь не авторизирован, то открываем окно регистрации
		} else {
			document.querySelector('.login').classList.add('active__window');
		}
		
	});
});

//окно оплаты
let buy = document.querySelector('.buy');
//функция помощник
function openCloseBuyWindow (elem ) {
	elem.addEventListener('click', () => {
		buySelect.classList.remove('active__window');
		buy.classList.add('active__window');
	});
}

//покупка подписки продолжение
//окно завершения оплаты
let buyFinish = document.querySelector('.buy__finish');
//кнопка оплатить на окне оплаты
let payCard = document.getElementById('pay__card');
//обработчик событий на кнопку оплатить
payCard.addEventListener('click', (event) => {
	event.preventDefault();
	buy.classList.remove('active__window');
	buyFinish.classList.add('active__window');
});

//сохраняем данные покупки подписок в LocalStorage
function addSubscriptionProfile(title, subTitle, documentTitle) {
	//подписки текущего User
	let nowUserSubscriptions = nowUser['subscriptions'];
	//кнопка завершения покупки
	let buyFinishButton = document.getElementById('buy__finish__button');
	buyFinishButton.addEventListener('click', () => {
		//закрываем окно покупки
		buyFinish.classList.remove('active__window');
		
		//временный массив с данными оформленной подписки 
		let arrayCardValue = [title.innerHTML, subTitle, documentTitle];
		//если у объекта nowUser из LS нет свойства subscriptions, то создаём новый
		if (!nowUserSubscriptions) {
			//записываем имя свойства 'subscriptions' и значение = данные оплаченной подписки
			nowUser.subscriptions = [{...arrayCardValue}];
			//сохраняем в LS
			localStorage.setItem('nowUser', JSON.stringify(nowUser))
			//обновляем данные в allUser(все пользователи)
			changeAllUser ();

		//если такое свойство есть, то обновляем данные
		} else if (nowUserSubscriptions) {
			
			//определяем новую подписку (netflix, youtube, spot)
			let SubscriptionsUpdate = () => {
			
				//перебираем массив
				for (let item of nowUserSubscriptions) {
					//если у Userа подписка на этот продукт уже есть, то изменяем его тариф

					if (item[2] == arrayCardValue[2]) {
						item[0] = arrayCardValue[0];
						item[1] = arrayCardValue[1];

						//обновляем данные в карточке
						localStorage.setItem('nowUser', JSON.stringify(nowUser));
						
						//обновляем данные в allUser(все пользователи)
						changeAllUser ();
						return true;
					}
				}
				// возвращаем false, если у Userа нет подписки на такой продукт
				return false;
			}
			
			//если такой подписки нет, то добавляем новую
			if (SubscriptionsUpdate() == false) {
				
				//пушим новую подписку в массив подписок
				nowUserSubscriptions.push({...arrayCardValue});
				//массив с подписками
				localStorage.setItem('nowUser', JSON.stringify(nowUser));
				
				//обновляем данные о текущем пользователе, а так же обновляем его в LS всех пользователей
				changeAllUser ();
			}
		}
	})
}

//обновление подписок текущего Usera в LS, а так же обновляем его в LS всех пользователей
function changeAllUser () {
	//получаем массив текущего пользователя из LS
	let allUser = Array.from(JSON.parse(localStorage.getItem('allUser')));

	//перебираем массив всех пользователей
	for (let item of allUser) {
		
		//находим текущего пользователя в массиве всех пользователей
		if (item[1] == nowUser[1]) {	
			
			//обновляем список подписок у текущего пользователя, а так же обновляем его в массиве всех пользователей
			item['subscriptions'] = nowUser['subscriptions'];
			
			//добавляем обновлённый список пользователей 
			// localStorage.setItem('nowUser', JSON.stringify(nowUser));
			localStorage.setItem('allUser', JSON.stringify(allUser));
			document.location = "profile.html";
		}
	}
}

//на youtube.html нет кнопок переключения, поэтому делаем проверку
if (document.querySelector('#six')) {
	//переключатели выбора подписки 6мес/12мес
	let priceSix = document.querySelectorAll('.price__six');
	let priceTwelve = document.querySelectorAll('.price__twelve');

	//прослушка клика на кнопку (6 месяцев)
	document.getElementById('six').addEventListener('click', () => {
			
			priceSix.forEach(item => {
				item.style.opacity = "1";
			});

			priceTwelve.forEach(item => {
				item.style.opacity = "0";
			});
		}) 
	
	//прослушка клика на кнопку (12 месяцев)
	document.getElementById('twelve').addEventListener('click', () => {
			priceSix.forEach(item => {
				item.style.opacity = "0";
			});

			priceTwelve.forEach(item => {
				item.style.opacity = "1";
			});
		});
	}
}