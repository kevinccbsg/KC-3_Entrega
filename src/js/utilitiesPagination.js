'use strict'
module.exports.createArrayToPaginate = (pages, itemsPerpage, contentItems) => {
	let copyContentItems = contentItems;
	let arrayItemsPerPage = [];
	let tmpArray = [];
	for (let i = 0; i < pages; i++) {
		for (let j = 0; j < itemsPerpage; j++) {
			tmpArray.push(copyContentItems.splice(0 , 1));
		}
		arrayItemsPerPage.push(tmpArray);
		tmpArray = [];
	}
	return arrayItemsPerPage;
}
module.exports.removeActive = (selector) => {
	for (var i = 0; i < selector.length; i++) {
		selector[i].className = '';
	}
}
module.exports.setPaginate = (numberPage, step, numberItems, copyContentItems, arrayItemsPerPage) => {

	for (var i = 0; i < numberItems; i++) {
		copyContentItems[i].className = 'story-section';
	}
	for (let i = 0; i < step; i++) {
		(arrayItemsPerPage[numberPage-1][i][0] != undefined) ? arrayItemsPerPage[numberPage-1][i][0].className = 'story-section show' : console.log('none');
	}
	return;
}
