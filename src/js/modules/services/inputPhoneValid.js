function inputPhoneValid(selector) {
	const phoneInputs = document.querySelectorAll(selector);
	
	function getInputNumberValue(e) {
		const inputValueFull = e.target.value,
				inputValueCurrent = e.data;
		
		if (inputValueFull.length < 2 && inputValueCurrent === '+') {
			return '+';
		} else {
			return inputValueFull.replace(/\D/g, "");
		}
	}

	function initPhoneInput(e) {
		const input = e.target,
				inputValueNumberFull = getInputNumberValue(e),
				firstSimbol = inputValueNumberFull[0];

		let resultInputValue;

		if (input.value.length != input.selectionStart) {
			const range = input.selectionStart - 1;
			if (e.data && /\D/g.test(e.data)) {
				input.value = input.value.replace(input.value[input.selectionStart - 1], '');
				input.setSelectionRange(range, range);
			}
			return;
		}

		if (['7', '8', '9'].includes(firstSimbol)) {
			switch (firstSimbol) {
				case '7':
					resultInputValue = '+7';
					break;
				case '8':
					resultInputValue = '8';
					break;
				case '9':
					resultInputValue = '+7 (9';
			}

			if (inputValueNumberFull.length > 1) {
				resultInputValue += ' (' + inputValueNumberFull.slice(1, 4);
			}
			if (inputValueNumberFull.length >= 5) {
				resultInputValue += ') ' + inputValueNumberFull.slice(4, 7);
			}
			if (inputValueNumberFull.length >= 8) {
				resultInputValue += '-' + inputValueNumberFull.slice(7, 9);
			}
			if (inputValueNumberFull.length >= 10) {
				resultInputValue += '-' + inputValueNumberFull.slice(9, 11);
			}
		} else if (firstSimbol === '+') {
			resultInputValue = '+';			
		} else if (!inputValueNumberFull) {
			resultInputValue = '';
		} else {
			resultInputValue = '+' + inputValueNumberFull.substring(0, 16);
		}

		input.value = resultInputValue;
	}

	phoneInputs.forEach(phoneInput => {
		phoneInput.addEventListener('input', initPhoneInput);
	});

}

export default inputPhoneValid;