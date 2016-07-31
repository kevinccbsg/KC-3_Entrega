'use strict'
const $ = require('jquery');
const storyLikeCommentInteraction = $('.action-item');
let actionItem = $('.action-item').find('.number-interaction-likes');
if (actionItem.length) {
	for (let i = 0, actionItemLength = actionItem.length; i < actionItemLength; i++) {
		if (typeof(Storage) !== "undefined") {
			if (localStorage.getItem(actionItem[i].id)) {
				actionItem[i].innerHTML = localStorage.getItem(actionItem[i].id);
			}
			else {
				actionItem[i].innerHTML = 0;
			}
		}
		else {
			console.log('Your browser Not support web storage');
		}
	}	
}

storyLikeCommentInteraction.on('click', function (ev) {
	ev.preventDefault();
	console.log('entro');
	console.log($(this).find('.number-interaction-likes'));
	let spanNumberInteraction = $(this).find('.number-interaction-likes');
	let identifierWebStorage = spanNumberInteraction.attr('id');
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		if (localStorage.getItem(identifierWebStorage)) {
			localStorage.setItem(identifierWebStorage, parseInt(localStorage.getItem(identifierWebStorage)) + 1);
			spanNumberInteraction.text(localStorage.getItem(identifierWebStorage));		
		}	
		else {
			localStorage.setItem(identifierWebStorage,1);
			spanNumberInteraction.text(localStorage.getItem(identifierWebStorage));
		}
	} 
	else {
		console.log('Your browser Not support web storage');
	}
});