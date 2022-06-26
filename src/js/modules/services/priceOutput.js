function priceOutput(elem, typeMessage, sum) {
	switch (typeMessage) {
		case 'notEnough': 
			elem.textContent = 'Для расчета должен быть выбран и РАЗМЕР картины и ТИП холста';
			elem.style.color = 'orange';
			elem.style.fontWeight = '700';
			elem.style.fontSize = '14px';
		break;
		case 'success': 
			elem.textContent = `${sum} р.`;
			elem.style.color = 'green';
			elem.style.fontWeight = '700';
			elem.style.fontSize = '20px';
		break;
		case 'error': 
			elem.textContent = 'К сожалению сейчас расчет стоимости недоступен. Уточнить цену можно у менеджера по телефону. Приносим свои извинения';
			elem.style.color = 'red';
			elem.style.fontWeight = '700';
			elem.style.fontSize = '14px';
		break;
		case 'clear': 
			elem.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
			elem.style.color = 'rgb(51, 51, 51)';
			elem.style.fontWeight = '400';
			elem.style.fontSize = '14px';
		break;
	}
}

export default priceOutput;