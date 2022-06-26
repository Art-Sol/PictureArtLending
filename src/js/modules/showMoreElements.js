import getData from "./services/getData";

function showMoreElements(trigger, wrapper, url) {
	const triggerElem = document.querySelector(trigger),
			wrapperElem = document.querySelector(wrapper);

	triggerElem.addEventListener('click', initShowElements);

	function createElem(arrayOfObjects) {
				for (let objDataOfElement of arrayOfObjects) {
					const element = document.createElement('div');
					element.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1',
												'animated', 'fadeInUp', 'newDownloadedElement');
					element.style.display = 'none';

					element.innerHTML = `
						<div class="styles-block">
							<img src=${objDataOfElement.src} alt="style">
							<h4>${objDataOfElement.title}</h4>
							<a href=${objDataOfElement.link}>Подробнее</a>
						</div>
					`;

					wrapperElem.appendChild(element);
					wrapperElem.style.overflow = 'hidden';
				}

				const newElements = document.querySelectorAll('.newDownloadedElement');
				newElements.forEach(item => item.style.display = 'block');
	}

	function initShowElements(e) {
		e.preventDefault();

		getData(url)
			.then(response => {
				createElem(response);
				this.remove();
				if (document.querySelector('.errorStyleMessage')) {
					document.querySelector('.errorStyleMessage').remove();
				}
			})
			.catch(error => {
				console.log(error);

				let errorMessageElem;

				if (document.querySelector('.errorStyleMessage')) {
					errorMessageElem = document.querySelector('.errorStyleMessage');
				} else {
					errorMessageElem = document.createElement('p');
					errorMessageElem.classList.add('errorStyleMessage');
					errorMessageElem.textContent = 'Произошла ошибка загрузки данных. Приносим извенения';
					errorMessageElem.style.textAlign = 'center';
					errorMessageElem.style.color = 'red';
					errorMessageElem.style.fontWeight = '700';
					wrapperElem.appendChild(errorMessageElem);
				}
			})
			.finally();
	}
}

export default showMoreElements;