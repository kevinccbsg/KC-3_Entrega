'use strict'
const $ = require('jquery');
const utilitiesPagination = require('./utilitiesPagination');
let numberItems = $('.story-section').length;
let contentItems = $('.story-section');
let linkPagination = $('.pagination > li a');
let nextPage = $('#next a');
let previousPage = $('#previous a');
let pages = 4;
let step = numberItems / pages;
let itemsPerpage = Math.round(step);
let targetToGo = $('#promoHeader');
let numberPage = 1;
let arrayItemsPerPage = utilitiesPagination.createArrayToPaginate(pages, itemsPerpage, contentItems);
let copyContentItems = $('.story-section');

utilitiesPagination.setPaginate(numberPage, step, numberItems, copyContentItems, arrayItemsPerPage);

linkPagination.on('click', function (ev) {
	ev.preventDefault();
	utilitiesPagination.removeActive($('.pagination > li'));
	$(this).parent().addClass('active');
	numberPage = parseInt($(this).text());
	if (!isNaN(numberPage)) {
		utilitiesPagination.setPaginate(numberPage, step, numberItems, copyContentItems, arrayItemsPerPage);
		$('html, body').animate({
			scrollTop: targetToGo[0].offsetHeight - 60
		});
	}
});

nextPage.on('click', function (ev) {
	ev.preventDefault();
	console.log("entro");
	$(this).attr('class','');
	numberPage++;
	utilitiesPagination.setPaginate(numberPage, step, numberItems, copyContentItems, arrayItemsPerPage);
	$('html, body').animate({
		scrollTop: targetToGo[0].offsetHeight - 60
	});
});

previousPage.on('click', function (ev) {
	ev.preventDefault();
	$(this).attr('class','');
	numberPage--;
	utilitiesPagination.setPaginate(numberPage, step, numberItems, copyContentItems, arrayItemsPerPage);
	$('html, body').animate({
		scrollTop: targetToGo[0].offsetHeight - 60
	});
	$(this).attr('class','disabled');
});