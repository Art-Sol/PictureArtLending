import postData from "./services/postData";
import closeModal from "./services/closeModal";
import inputPhoneValid from "./services/inputPhoneValid";
import inputTextValid from "./services/inputTextValid";
import priceOutput from "./services/priceOutput";

const forms = function () {
	
	const forms = document.querySelectorAll('form'),
			inputs = document.querySelectorAll('input'),
			selects = document.querySelectorAll('select'),
			textareas = document.querySelectorAll('textarea'),
			uploadInputs = document.querySelectorAll('[name=upload]'),
			calcPriceElem = document.querySelector('.calc-price');
			
	const messages = {
				loading: {
					message: 'Отправляем данные. Подождите некоторое время...', 
					color: 'orange',
					img: 'assets/img/spinner.gif'
				},
				success: {
					message: 'Спасибо! Мы скоро свяжемся с Вами!', 
					color: 'green',
					img: 'assets/img/ok.png'
				},
				error: {
					message: 'Что-то пошло не так. Попробуйте еще раз',
					color: 'red',
					img: 'assets/img/fail.png'
				}
			};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};


	forms.forEach(form => {
		initFormSubmit(form);
	});

	inputPhoneValid('[name = phone]');
	inputTextValid('[name = name]');
	inputTextValid('[name = message]');
	
	uploadInputs.forEach(uploadImput => {
		uploadImput.addEventListener('input', () => {
			let fileName = uploadImput.files[0].name;
			let arrFileName = fileName.split('.');
			let dot = arrFileName[0].length > 6 ? '...&nbsp&nbsp.' : '.';
			fileName = `${arrFileName[0].slice(0, 6)}${dot}${arrFileName[1]}`;
			uploadImput.previousElementSibling.innerHTML = fileName;
		});
	});

	function messageStatus(form, messageObj) {
		let messageElement;
		
		if (Array.from(form.parentElement.children).find(item => item.classList.contains('messageStatus'))) {
			messageElement = Array.from(form.parentElement.children).find(item => item.classList.contains('messageStatus'));
		} else {
			messageElement = document.createElement('div');
			messageElement.classList.add('messageStatus');
			messageElement.style.textAlign = 'center';
			messageElement.style.marginTop = '1rem';
			messageElement.style.fontWeight = '700';
			messageElement.style.display = 'none';
			form.parentElement.append(messageElement);
		}

		messageElement.innerHTML = `
												<img src="${messageObj.img}"></img>
												<p>${messageObj.message}</p>
											`;
		messageElement.style.color = `${messageObj.color}`;

		form.classList.add('animated', 'fadeOut');
		setTimeout(() => {
			form.style.display = 'none';
			messageElement.classList.add('animated', 'fadeIn');
			messageElement.style.display = 'block';
		}, 400);
	}


	function clearInputsAndData(form) {
		const messageStatus = document.querySelectorAll('.messageStatus'),
				allModals = document.querySelectorAll('[data-modal]');

		inputs.forEach(item => item.value = '');
		selects.forEach(item => item.value = '');
		textareas.forEach(item => item.value = '');
		uploadInputs.forEach(item => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		});

		priceOutput(calcPriceElem, 'clear');

		allModals.forEach(modal => closeModal(modal));
		form.classList.remove('animated', 'fadeOut');
		form.style.display = 'block';
		messageStatus.forEach(item => item.remove());
	}


	function initFormSubmit(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			
			messageStatus(form, messages.loading);

			const formData = new FormData(form);
					
			if (form.contains(calcPriceElem)) {
				let price = calcPriceElem.textContent.replace(/\D/g, '');
				formData.set('price', price);
			}

			let api = form.closest('.popup-design') || form.classList.contains('calcForm') ? path.designer : path.question;

			postData(api, formData)
			.then(data => {
				console.log(data);
				messageStatus(form, messages.success);
			})
			.catch(error => {
				console.log(error);
				messageStatus(form, messages.error);
			})
			.finally(() => {
				setTimeout(() => {
					clearInputsAndData(form);
				}, 4000);
			});
		});
	}

};

export default forms;