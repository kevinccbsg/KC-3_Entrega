'use strict'
const $ = require('jquery');
let navbar = $('#main-navbar');
let lightPrimaryColor = '#F5F5F5';
let offsetNavbar = 105;
let sectionComments = $('#section-comments');
let displayComments = require('./displayComments');
let _processAjaxCall = true;

$(document).on('scroll', function (ev) {
	let sectionContentWeb = $('#content-web').offset().top;
	let sectionCommentsTop = sectionComments.offset().top;
	let scrollToCompare = $(window).scrollTop() + offsetNavbar;
	let scrollBottom = $(window).scrollTop() + $(window).height();
	if (scrollToCompare <= sectionContentWeb) {
		navbar.removeClass('over-header');
	}
	else {
		navbar.addClass('over-header');
	}
	if (scrollBottom > sectionCommentsTop && _processAjaxCall == true) {
		displayComments.loadComments();
		_processAjaxCall = false;
	}
});