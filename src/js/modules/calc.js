import getData from "./services/getData";
import priceOutput from "./services/priceOutput";

function calc(formSelector) {
	const form = document.querySelector(formSelector),
			selects = form.querySelectorAll('select'),
			promocodeElem = document.querySelector('.promocode'),
			selectSize = form.querySelector('#size'),
			selectMaterial = form.querySelector('#material'),
			selectOptions = form.querySelector('#options'),
			priceElem = form.querySelector('.calc-price');
	
	let sum = 0; 

	function getPrice	() {
		if (!selectSize.value || !selectMaterial.value) {
			priceOutput(priceElem, 'notEnough');
		} else {
			getData('http://localhost:3000/prices')
				.then(res => {
					const sizePrice = res.size[selectSize.value],
							materialPrice = res.material[selectMaterial.value],
							optionPrice = selectOptions.value ? res.options[selectOptions.value] : 0;
					
					sum = Math.round(sizePrice * materialPrice + optionPrice);

					if (promocodeElem.value === 'IWANTPOPART') {
						sum = Math.round(sum * 0.7);
					}

					priceOutput(priceElem, 'success', sum);
				})
				.catch(err => {
					priceOutput(priceElem, 'error');
					console.log(err);
				})
				.finally();
		}
	}

	selects.forEach(select => {
			select.addEventListener('change', getPrice);
		});

	promocodeElem.addEventListener('input', getPrice);
}



export default calc;