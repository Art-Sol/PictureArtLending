import closeModal from "./services/closeModal";
import openModal from "./services/openModal";

function modals(state) {
	function bindModal(triggerSelector,
							windowSelector,
							closeSelector, 
							closeByOverlay = true,
							propsValidation = [], 
							hideTrigger = false,
							openByScroll = false) {

		const triggers = document.querySelectorAll(triggerSelector),
				windowOfModal = document.querySelector(windowSelector),
				closeBtn = document.querySelector(closeSelector),
				allModals = document.querySelectorAll('[data-modal]');

		triggers.forEach(trigger => {
			trigger.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				//	Скрытие тригерного элемента (если нужно)
				if (hideTrigger) {
					hideTriggerElem(triggerSelector);
				}

				// Валидация полей (если нужна)
				if (propsValidation.length > 0) {
					let checkValidation = propsValidation.every(item => state[item]);
					if (checkValidation) {
						allModals.forEach(modal => closeModal(modal));
						openModal(windowOfModal);
					} else {
						const existentMessageValid = document.querySelector('.messageValid');
						if (existentMessageValid) {
							existentMessageValid.remove();
						}
						const messageValid = document.createElement('div');
						messageValid.innerText = 'Пожалуйста заполните все поля';
						messageValid.classList.add('messageValid', 'status');
						trigger.insertAdjacentElement('beforeBegin', messageValid);
					}
				} else {
					allModals.forEach(modal => closeModal(modal));
					openModal(windowOfModal);
				}
			});
		});

		closeBtn.addEventListener('click', () => {
				allModals.forEach(modal => closeModal(modal));
				closeModal(windowOfModal);
		});

		windowOfModal.addEventListener('click', (e) => {
			if (e.target == windowOfModal && closeByOverlay == true) {
				allModals.forEach(modal => closeModal(modal));
				closeModal(windowOfModal);
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape') {
				allModals.forEach(modal => closeModal(modal));
				closeModal(windowOfModal);
			}
		});

		
		if (openByScroll) {
			window.addEventListener('scroll', scrollOpenModal);
		}

		function scrollOpenModal() {
			const totalHeight = Math.max(
				document.body.scrollHeight, document.documentElement.scrollHeight,
				document.body.offsetHeight, document.documentElement.offsetHeight,
				document.body.clientHeight, document.documentElement.clientHeight
			);
			const userScroll = document.documentElement.scrollTop + document.documentElement.clientHeight;

			if (totalHeight === userScroll) {
				if (hideTrigger && Array.from(triggers).every(item => item.classList.contains('closed'))) {
					window.removeEventListener('scroll', scrollOpenModal);
				} else {
					openModal(windowOfModal);
					window.removeEventListener('scroll', scrollOpenModal);
					if (hideTrigger) {
						hideTriggerElem(triggerSelector);
					}
				}
			}
		}
	}

	function showModalByTime(windowSelector, time) {
		const windowOfModal = document.querySelector(windowSelector), 
				allModals = document.querySelectorAll('[data-modal]');
		setTimeout(() => {
			let openMode = true;
			
			allModals.forEach(modal => {
				if (getComputedStyle(modal).display !== 'none') {
					openMode = false;
				}
			});

			if (openMode) {
				openModal(windowOfModal);
			}
		}, time);
	}

	function hideTriggerElem(triggerSelector) {
		const triggers = document.querySelectorAll(triggerSelector);
		triggers.forEach(item => {
			item.style.display = 'none';
			item.classList.add('closed');
		});
	}



	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true, [], true, true);
	showModalByTime('.popup-consultation', 60000);
}

export default modals;
