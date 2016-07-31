'use strict'
const $ = require('jquery');
let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;
let current = new Date();
let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
let current_fomated = current.getDate()  + '/' + months[current.getMonth()] + '/' + current.getFullYear();
let datePublicDayWeek = current.getDay()
let finish = false;
function date() {
	seconds++;
	if (minutes == 0 && hours == 0 && days == 0) {
		$('.date-time').text('LLeva posteado: '+seconds+'s');
	}
	if (seconds == 60) {
		seconds = 0;
		minutes++;
		if (hours == 0 && days == 0){
			$('.date-time').text(' '+minutes+'min');
		}
	}
	if (minutes == 60) {
		minutes = 0;
		hours++;
		if (days == 0) {
			$('.date-time').text(' '+hours+'hours');
		}
	}
	if (hours == 24) {
		hours = 0;
		days++;
		if (days < 6) {
			switch (datePublicDayWeek) {
				case 0: 
					$('.date-time').text('On sunday');
				break;
				case 1: 
					$('.date-time').text('On tuesday');
				break;
				case 2: 
					$('.date-time').text('On wendnesday');
				break;
				case 3: 
					$('.date-time').text('On thursday');
				break;
				case 4: 
				$('.date-time').text('On friday');
					break;
				case 5: 
					$('.date-time').text('On saturday');
				break;
				case 6: 
					$('.date-time').text('On monday');
				break;
				default:
					console.log('error');
			}
		}
	}
	if (days == 6 && finish == false) {
		$('.date-time').text(current_fomated);
		finish == true;
	}
}
if($('.date-time').length) {
	setInterval(date, 1000);
}
