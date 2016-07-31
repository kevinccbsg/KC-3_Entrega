'use strict'
const $ = require('jquery');
const ajaxUtilities = require('./ajaxUtilities');
const validationUtilities = require('./commetsValidationUtilities');
const formComments = $('#form-coments');
let textareaInput = document.getElementById('commentMessage');
let nameInput = document.getElementById('inputName');
let lasNameInput = document.getElementById('inputLastName');
let emailInput = document.getElementById('inputEmail');
let inputs = $('.form-group input, .form-group textarea');
let errorBlock = document.querySelector('#error-message.block-content');
let errorText = document.getElementById('error-text');
let displayComments = require('./displayComments');

displayComments.loadComments();

formComments.on('submit', function (ev) {
	ev.preventDefault();
	let textAreaText = textareaInput.value;
	let numberCaracters = textAreaText.split(" ");
	if (numberCaracters.length > 120) {
		validationUtilities.errorSubmit('Max. 120 Characters', errorBlock, errorText);
		validationUtilities.helperValidity(textareaInput, ev);
		return false;
	}
	if (textareaInput.checkValidity() === false) {
		validationUtilities.errorSubmit('Please write a comment', errorBlock, errorText);
		validationUtilities.helperValidity(textareaInput, ev);
		return false;
	}
	if (nameInput.checkValidity() === false) {
		validationUtilities.errorSubmit('Complete name field', errorBlock, errorText);
		validationUtilities.helperValidity(nameInput, ev);
		return false;
	}
	if (lasNameInput.checkValidity() === false) {
		validationUtilities.errorSubmit('Complete last name field', errorBlock, errorText);
		validationUtilities.helperValidity(lasNameInput, ev);
		return false;
	}
	if (emailInput.checkValidity() === false) {
		if(emailInput.validity.typeMismatch === true || emailInput.validity.patternMismatch == true) {
			validationUtilities.errorSubmit('Set up a correct format email', errorBlock, errorText);
			validationUtilities.helperValidity(emailInput, ev);
			return false;
		}
		else {
			validationUtilities.errorSubmit('Complete email field', errorBlock, errorText);
			validationUtilities.helperValidity(emailInput, ev);
			return false;
		}
	}
	let formatedData = {
		comment: textAreaText,
		name: nameInput.value,
		lastName: lasNameInput.value,
		email: emailInput
	}
	ajaxUtilities.save(formatedData, function (response) {
		for (var i = 0; i < inputs.length; i++) {
			inputs[i][0].value = '';
		}
	}, function (err) {
		console.log('No se guardo');
	});

});

inputs.on('keydown', function (ev) {
	$(this)[0].style.borderColor = '#f5f5f5';
});