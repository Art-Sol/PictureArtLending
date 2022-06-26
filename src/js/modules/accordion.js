function accordion(triggerSelector) {
	const triggers = document.querySelectorAll(triggerSelector);

	function clearAllTriggers() {
		triggers.forEach(trigger => {
			trigger.classList.remove('active');
			trigger.nextElementSibling.classList.remove('active');
			trigger.nextElementSibling.style.maxHeight = '0px';
		});
	}

	triggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
			if (trigger.classList.contains('active')) {
				clearAllTriggers();
			} else {
				clearAllTriggers();
				trigger.classList.add('active');
				trigger.nextElementSibling.classList.add('active');	
				trigger.nextElementSibling.style.maxHeight = (trigger.nextElementSibling.scrollHeight + 70) + 'px';
			}
		});
	});
}

export default accordion;