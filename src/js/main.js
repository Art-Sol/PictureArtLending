import modals from "./modules/modals";
import slider from "./modules/slider";
import forms from "./modules/forms";
import showMoreElements from "./modules/showMoreElements";
import calc from "./modules/calc";
import filter from "./modules/filter";
import pictureSize from "./modules/pictureSize";
import accordion from "./modules/accordion";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";

window.addEventListener('DOMContentLoaded', () => {
'use strict';

	modals();
	slider('.main-slider', '.main-slider-item', '', '', 1, true, 'vertically');
	slider('.feedback-slider', '.feedback-slider-item', '.main-prev-btn', '.main-next-btn', 1, true, 'horizontally');
	forms();
	showMoreElements('.button-styles', '#styles .row', 'http://localhost:3000/styles');
	calc('.calcForm');
	filter();
	pictureSize('.sizes-block');
	accordion('.accordion-heading');
	burger('.burger', '.burger-menu');
	scrolling('.pageup');
	drop('[name="upload"]');

}); 