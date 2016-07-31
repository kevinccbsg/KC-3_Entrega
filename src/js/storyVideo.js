'use strict'
const $ = require('jquery');
const playImg = $('.play-img');

playImg.on('click', function (ev) {
	ev.preventDefault();
	$(this).css('display','none');
	let video = $(this).next()[0];
	video.play();
	video.setAttribute("controls","controls")
});