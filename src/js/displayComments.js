'use strict'
const $ = require('jquery');
const ajaxUtilities = require('./ajaxUtilities');
let stateComments = $('.states-coments');

module.exports = {
	loadComments: () => {
		ajaxUtilities.listComments(function (response) {
			if (response.length === 0) {
				console.log('No hay comentarios');
				stateComments.attr('class','states-coments no-comments').css('display','block');
			}
			else {
				console.log(response);
				stateComments.html('');
				for (let i in response) {
					let commentContents = response[i];
					let comment = commentContents.comment || '';
					let nameUser = commentContents.name || '';
					let lastNameUser = commentContents.last_name || '';
					let email = commentContents.email || '';

					let html = `<div class="ui-element comments-container">
									<section class="comment-card">
										<header>
											<div class="comment-header">
												<h4 class="user-comment">${nameUser} ${lastNameUser}</h4>
												<h6 class="email-comment">${email}</h6>
											</div>
										</header>
										<article>
											<div class="comment-content">
												<p>${comment}</p>
											</div>
										</article>
									</section>
								</div>`;
					stateComments.append(html);
				}
				stateComments.attr('class','states-coments comments').css('display','block');

			}
		}, function (err) {
			if(err.status === 404) {
				console.log('Bad Request: ', err);
				stateComments.attr('class','states-coments no-comments');
			}
			if(err.statur === 500) {
				console.log('Internal server Error: ', err);
				stateComments.attr('class','states-coments no-comments');
				$('no-comments-content').html('<h3>Sorry, An Internal Error Ocoured</h3><br><p>It will be fixed soon.</p>')
			}
		});
	}
}