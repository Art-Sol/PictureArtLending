function pictureSize(blockSelector) {
	const blocks = document.querySelectorAll(blockSelector);

	function showPicture(block) {
		const texts = block.querySelectorAll('p:not(.sizes-hit)'),
				img =  block.querySelector('img'),
				src = img.getAttribute('src').slice(0, -4) + '-1.png';

		texts.forEach(p => p.style.display = 'none');
		img.setAttribute('src', src);
	}

	function hidePicture(block) {
		const texts = block.querySelectorAll('p:not(.sizes-hit)'),
				img =  block.querySelector('img'),
				src = img.getAttribute('src').slice(0, -6) + '.png';

		texts.forEach(p => p.style.display = 'block');
		img.setAttribute('src', src);
	}


	blocks.forEach(block => {
		block.addEventListener('mouseover', () => showPicture(block));
		block.addEventListener('mouseout', () => hidePicture(block));
	});
}

export default pictureSize;