'use strict'
module.exports.createArrayToPaginate = function (pages, itemsPerpage, contentItems) {
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
module.exports.removeActive = function (selector) {
	for (var i = 0; i < selector.length; i++) {
		selector[i].className = '';
	}
}
module.exports.setPaginate = function (numberPage, numberItems, copyContentItems, arrayItemsPerPage) {

	for (var i = 0; i < numberItems; i++) {
		copyContentItems[i].style.backgroundColor = 'transparent';
	}
	for (let i = 0; i < step; i++) {
		(arrayItemsPerPage[numberPage-1][i][0] != undefined) ? arrayItemsPerPage[numberPage-1][i][0].style.backgroundColor = 'red' : console.log('none');
	}
	return;
}
