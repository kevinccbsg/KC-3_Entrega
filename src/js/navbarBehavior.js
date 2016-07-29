'use strict'
const $ = require('jquery');
let navbar = $('#main-navbar');
let lightPrimaryColor = '#F5F5F5';
let offsetNavbar = 105;

$(document).on('scroll', function (ev) {
	let sectionContentWeb = $('#content-web').offset().top;
	let scrollToCompare = $(window).scrollTop() + offsetNavbar;
	if (scrollToCompare <= sectionContentWeb) {
		navbar.removeClass('over-header');
	}
	else {
		navbar.addClass('over-header');
	}
});