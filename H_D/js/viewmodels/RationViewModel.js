function RationViewModel(){

	var d = new Date();

	var addedDishes = dataStore.addedDishes;
	var selectedDate = ko.observable(d.toDateString());
	var dishDate = ko.observable();

	var total = {
		protein: ko.computed(function() {
			return getSum(addedDishes(), 'protein', selectedDate()).toFixed(2);
		}),
		fats: ko.computed(function() {
			return getSum(addedDishes(), 'fats', selectedDate()).toFixed(2);
		}),
		carbohydrate: ko.computed(function() {
			return getSum(addedDishes(), 'carbohydrate', selectedDate()).toFixed(2);
		}),
		kcal: ko.computed(function() {
			return getSum(addedDishes(), 'kcal', selectedDate()).toFixed(2);
		})
	};

	var delDish = function(){
		addedDishes.remove(this);
	};

	var print = function(){
		$('section.mp-ration').printThis();
	};

	var dates = ko.computed(function(){
		return sortDate(addedDishes());
	});


	var filteredRation = ko.computed(function(){

		var calendar = ko.utils.arrayFilter(addedDishes(), function(item) {
			return !selectedDate() ? true : (item.date.indexOf(selectedDate()) != -1);
		});

		var itemsDate = ko.utils.arrayFilter(calendar, function(item) {
			return !dishDate() ? true : (item.date.indexOf(dishDate()) != -1);
		});

		return itemsDate;
	});

	dishDate.subscribe(function(change){
		if (change) {
			selectedDate(dishDate());
		}
	});

	selectedDate.subscribe(function(change){
		dishDate(undefined);
	});

	return {
		addedDishes: addedDishes,
		delDish: delDish,
		dates: dates,
		dishDate: dishDate,
		total: total,
		print: print,
		selectedDate: selectedDate,
		filteredRation: filteredRation
	}
};

var rationVM = new RationViewModel();

function getSum(dishes, name, date){
	var sum = 0;
	$.each(dishes, function(i) {
		if (date === dishes[i].date) {
			sum += dishes[i][name];
		}
	});
	return sum;
};

function sortDate(items) {
	var arr = [];
	$.each(items, function(i){
		if (arr.indexOf(items[i].date) < 0){
			arr.push(items[i].date);
		}
	});
	return arr;
};