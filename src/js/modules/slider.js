function slider(sliderBodySelector,
					slidesSelector,
					prevBtnSelector,
					nextBtnSelector,
					showFirstSlider = 1,
					loop = false,
					direction = 'horizontally') {

	const slides = document.querySelectorAll(slidesSelector),
			sliderBody = document.querySelector(sliderBodySelector);
			
	let slideIndex = showFirstSlider - 1,
		sliderIntervalId;

	function initSlider() {
		slides.forEach(item => {
			item.style.display = 'none';
			item.classList.add('animated');
		});	
		slides[slideIndex].style.display = 'block';
		sliderBody.style.overflow = 'hidden';
	}

	initSlider();


	function slideTurnPlus(n) {
		slides[slideIndex].style.display = 'none';
		slides[slideIndex].classList.remove('slideInRight', 'slideInLeft', 'slideInUp', 'slideInDown');

		if (slideIndex >= slides.length - 1) {
			slideIndex = 0;
		} else {
			slideIndex += n;
		}

		slides[slideIndex].style.display = 'block';
		if (direction === 'vertically') {
			slides[slideIndex].classList.add('slideInUp');
		} else {
			slides[slideIndex].classList.add('slideInLeft');
		}
	}

	function slideTurnMinus(n) {
		slides[slideIndex].style.display = 'none';
		slides[slideIndex].classList.remove('slideInLeft', 'slideInRight',  'slideInUp', 'slideInDown');

		if (slideIndex <= 0) {
			slideIndex = slides.length - 1;
		} else {
			slideIndex -= n;
		}

		slides[slideIndex].style.display = 'block';
		if (direction === 'vertically') {
			slides[slideIndex].classList.add('slideInDown');
		} else {
			slides[slideIndex].classList.add('slideInRight');
		}
	}

	function sliderLoop() {
		sliderIntervalId = setInterval(() => slideTurnPlus(1), 3000);
	}

	if (loop) {
		sliderLoop();
		slides[0].parentElement.addEventListener('mouseenter', () => clearTimeout(sliderIntervalId));
		slides[0].parentElement.addEventListener('mouseleave', () => sliderLoop());
	}

	try {
		const prevBtn = document.querySelector(prevBtnSelector),
				nextBtn = document.querySelector(nextBtnSelector);

		prevBtn.addEventListener('click', () => {
			slideTurnMinus(1);
		});

		nextBtn.addEventListener('click', () => {
			slideTurnPlus(1);
		});
	} catch (error) {}
}

export default slider;