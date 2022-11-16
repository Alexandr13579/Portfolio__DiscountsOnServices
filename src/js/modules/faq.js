//блок FAQ, аккардеон 
let faqBlock = document.querySelectorAll('.faq__block');
	faqBlock.forEach( item => {
		item.addEventListener('click', event => {
			const nowItemClick = event.currentTarget.dataset.block;

			document.querySelector(`[data-arrow ="${nowItemClick}"]`).classList.toggle('faq__img-active');
			document.querySelector(`[data-sub-text = "${nowItemClick}"]`).classList.toggle('faq__sub-text-active');
		})
	});