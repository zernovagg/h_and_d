// http://www.kalor.ru/table_kalor/34-gotovie.html

$(function() {

	ko.applyBindings(rationVM, $('section.mp-ration')[0]);
	ko.applyBindings(rationVM, $('div.calendar')[0]);
	
	ko.applyBindings(dishesVM, $('section.mp-dishes')[0]);
	ko.applyBindings(settingsVM, $('div.mp-settings')[0]);

});