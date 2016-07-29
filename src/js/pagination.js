'use strict'
const $ = require('jquery');
const utilitiesPagination = require('./utilitiesPagination');
let numberItems = $('.story-section').length;
let contentItems = $('.story-section');
let linkPagination = $('.pagination > li a');
let pages = 4;
let step = numberItems / pages;
let itemsPerpage = Math.round(step);
let targetToGo = $('#promoHeader');

let arrayItemsPerPage = utilitiesPagination.createArrayToPaginate(pages, itemsPerpage, contentItems);
let copyContentItems = $('.story-section');

linkPagination.on('click', function (ev) {
	ev.preventDefault();
	utilitiesPagination.removeActive($('.pagination > li'));
	$(this).parent().addClass('active');
	let numberPage = parseInt($(this).text());
	utilitiesPagination.setPaginate(numberPage, step, numberItems, copyContentItems, arrayItemsPerPage);
	$('html, body').animate({
		scrollTop: targetToGo[0].offsetHeight - 60
	});
});