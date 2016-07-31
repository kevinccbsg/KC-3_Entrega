'use strict'
const $ = require('jquery');

module.exports = {
	save: function (comment, successCallback, errorCallback) {
		let formData = new FormData();
		formData.append('comment', comment.comment);
		formData.append('name', comment.name);
		formData.append('last_name', comment.lastName);
		formData.append('email', comment.email);

		$.ajax({
			url: '/api/comments/',
			method: 'post',
			data: formData,
			processData: false,
			contentType: false,
			success: successCallback,
			error: errorCallback
		});
	},
	listComments: function (successCallback, errorCallback) {
		$.ajax({
			url: '/api/comments/',
			method: 'get',
			success: successCallback,
			error: errorCallback
		});
	}
}