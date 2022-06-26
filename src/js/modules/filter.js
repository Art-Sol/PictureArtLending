function filter() {
	const menu = document.querySelector('.portfolio-menu'),
			items = document.querySelectorAll('.portfolio-block'),
			wrapper = document.querySelector('.portfolio-wrapper'),
			noPortfolioBlock = document.querySelector('.portfolio-no');

	wrapper.style.cssText = `
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	`;

	function menuActiveStyle(e){
		const menuItem = e.target,
				menuItemsAll = menu.querySelectorAll('li');
		menuItemsAll.forEach(item => {
			item.classList.remove('active');
		});
		menuItem.classList.add('active');
	}

	function itemsFilter(menuItemName) {
		items.forEach(item => {
			if (item.classList.contains(menuItemName)) {
				item.classList.add('animated', 'fadeIn');
				item.style.display = 'block';
			} else {
				item.classList.remove('animated', 'fadeIn');
				item.style.display = 'none';
				
			}
		});
	}

	function noItems(menuItemName) {
		if (!Array.from(items).find(item => item.classList.contains(menuItemName))) {
			noPortfolioBlock.style.display = 'block';
			noPortfolioBlock.classList.add('animated', 'fadeIn');
		} else {
			noPortfolioBlock.classList.remove('animated', 'fadeIn');
			noPortfolioBlock.style.display = 'none';
		}
	}

	menu.addEventListener('click', (e) => {
		if (e.target && e.target.tagName === 'LI') {
			const menuItemName =  e.target.className.replace('active', '').trim();
			menuActiveStyle(e);
			itemsFilter(menuItemName);
			noItems(menuItemName);
		}
	});
}

export default filter;