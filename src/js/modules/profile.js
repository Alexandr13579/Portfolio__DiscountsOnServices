if (document.querySelector('.main__data')) {
	
	//карточка куда будут выводится данные текущего User
	let blockData2Form = document.querySelector('.block-data2__form');
	//name и email карточки
	let nameUser = blockData2Form.querySelector('#name__user');
	let emailUser = blockData2Form.querySelector('#email__user');

	//текущий пользователь
	let nowUser = JSON.parse(localStorage.getItem('nowUser'));
	//подписки текущего пользователя
	let nowUserSubscriptions = nowUser['subscriptions'];
	//все пользователи
	let allNewUser = JSON.parse(localStorage.getItem('allUser'));
	//name и email пользователя
	nameUser.value = nowUser[0];
	emailUser.value = nowUser[1];

	//Редактирование данных пользователя
	//вешаем обработчик событий на отправку формы
	blockData2Form.addEventListener('submit', (event) => {
			//отменяем отправку
			event.preventDefault();

			//через цикл находим текущего пользователя в массиве всех пользователей
			for (let item of allNewUser) {
				//сравниваем данные текущего пользователя с каждым пользователем в массиве
				if (item[0] == nowUser[0] && item[1] == nowUser[1]) {
					//меняем данные у найденного пользователя 
					item[0] = nameUser.value;
					item[1] = emailUser.value;
					//сохраняем обновленный массив всех пользователей в LS
					localStorage.setItem('allUser', JSON.stringify(allNewUser))
				}
			}
			//меняем данные текущего пользователя
			nowUser[0] = nameUser.value;
			nowUser[1] = emailUser.value;
			//сохраняем
			localStorage.setItem('nowUser', JSON.stringify(nowUser))
		});

	//блок вывода подписок пользователя
	let blocksSubscriptionsProfile = document.querySelector('.block-data3__blocks');
	//если у пользователя есть подписки то 
	if (nowUserSubscriptions) {
		//через цикл перебираем весь массив подписок
		for (let item of nowUserSubscriptions) {
			//создаём html - элемент div
			let blockSubscription = document.createElement('div');
			//с помощью функции помощника вставляем готовую html разметку в созданный div
			blockSubscription.innerHTML = innerShowSubscription(item);
			//вставляем в конец родительского узла наш созданный div с контентом
			blocksSubscriptionsProfile.appendChild(blockSubscription);
		}
	//в ином случае(нет подписок) вставляем текст
	} else {
		blocksSubscriptionsProfile.innerHTML = `<div class ="subscription__no">Здесь будут отображаться ваши подписки</div>`;
	}
	//функция помощник, создаёт контент для элементов div
	function innerShowSubscription (item) {
			return `
					<div class="block-data3__block">
						<div class="block-data3__top ${item[2]}">
							<h4 class="block-data3__title">${item[0]}</h4>
						</div>
						<div class="block-data3__bottom">
							<ul class="block-data3__subtitle">${item[1]}</ul>
							<button class="block-data3__button ${item[2]}">Change plan</button>
						</div>
					</div>
					`
	}

	//все кнопки в блоке подписок(change plan), для изменения подписки
	let blockData3Button = document.querySelectorAll('.block-data3__button');
	blockData3Button.forEach(item => {
		item.addEventListener('click', () => {
			if (item.classList.contains('Netflix')) {
				document.location.href = 'netflix.html'
			} else if (item.classList.contains('Spotify')) {
				document.location.href = 'spotify.html'
			} else if (item.classList.contains('YouTube')) {
				document.location.href = 'youtube.html'
			}
		})
	})

	document.querySelector('.wrapper').addEventListener('click', (event) => {
		if ( event.target.closest('.logout') ) {
			localStorage.removeItem('nowUser');
			otherLogin.innerHTML = localStorage.getItem('registerInner', registerInner);
			document.location = "index.html";
		}  else if (event.target.closest('.data__exit')) {
			document.location = "index.html";
		}
	})

		//перелистываем окна в профиле (data-block2 || data-block3)
		let blockData1Menu = document.querySelector('.block-data1__menu')
		blockData1Menu.addEventListener('click', event => {
			if (event.target.closest('.data1__item1') ) {
				document.querySelector('.data1__item2').classList.remove('item__actives');
				document.querySelector('.block-data3').classList.remove('data__active');
				document.querySelector('.data1__item1').classList.add('item__actives');
				document.querySelector('.block-data2').classList.add('data__active');
			} else if (event.target.closest('.data1__item2') ) {
				document.querySelector('.data1__item2').classList.add('item__actives');
				document.querySelector('.block-data3').classList.add('data__active');
				document.querySelector('.data1__item2').classList.remove('item__actives');
				document.querySelector('.block-data2').classList.remove('data__active');
			}
		});
}