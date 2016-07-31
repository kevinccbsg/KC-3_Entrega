'use strict'

function _closeError (blockError) {
	blockError.style.display = 'none';
}

module.exports.helperValidity = function (input, event) {
	if (input != null) {
		input.focus();
		input.style.borderColor = "red";
		event.preventDefault();
	}
	else {
		event.preventDefault();
	}
}

module.exports.errorSubmit = function (message, blockError, textError) {
	blockError.style.display = 'block';
	textError.innerHTML = message;
	setTimeout(function() {
		_closeError(blockError);
	}, 3000);
}