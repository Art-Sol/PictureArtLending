function inputTextValid(selector) {
	const textInputs = document.querySelectorAll(selector);
	
	function initTextInput(e) {
		const currentSimbol = e.data,
				value = e.target.value;

		if (/[^а-яё 0-9]/ig.test(currentSimbol)) {
			e.target.value = value.replace(value[e.target.selectionStart - 1], '');
		}
	}

	textInputs.forEach(textInput => {
		textInput.addEventListener('input', initTextInput);
	});
}

export default inputTextValid;