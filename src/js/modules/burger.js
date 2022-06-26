function burger(menuBtnSelector, menuBodySelector) {
	const btn = document.querySelector(menuBtnSelector),
			menu = document.querySelector(menuBodySelector);

	btn.addEventListener('click', () => {
		if (getComputedStyle(menu).display === 'none' && window.innerWidth < 992) {
			menu.style.display = 'block';
		} else {
			menu.style.display = 'none';
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth >= 992) {
			menu.style.display = 'none';
		}
	});
}

export default burger;