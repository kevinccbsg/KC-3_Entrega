'use strict'
const $ = require('jquery');

$('#togle-categories').on('click', function(ev) {
	ev.preventDefault();
	$(this).parent().parent().toggleClass("hide-animate show-animate")
});

$('#searchButton').on('click', function (ev) {
	ev.preventDefault();
	$('body').attr('class','search-story');
});

$('#closeSearchBar').on('click', function (ev) {
	ev.preventDefault();
	$('body').attr('class','full-web');
});

$('#searchButtonDesktop').on('click', function (ev) {
	ev.preventDefault();
	let textInput = $('#navbarSearchInput').val(),
		textInputClass = $('#navbarSearchInput').attr('class');
	if (textInput !== '' && textInputClass === 'text-search-input active') {
		console.log('peticion ajax');
	}
	else {
		$('#navbarSearchInput').toggleClass('active');
	}
});