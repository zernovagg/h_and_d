function DishesViewModel(){

	var dishes = ko.observableArray([]);
	var components = ko.observableArray();
	var selectedComp = ko.observable();
	var time = ko.observable();
	var limitation = settingsVM.limitation;

	var choose = {
		components: ko.observableArray(),
		types: ko.observableArray(),
		time: ko.observableArray(['Breakfast', 'Dinner', 'Supper'])
	};

	var filter = {
		excludeComp: ko.observableArray(),
		type: ko.observable(),
		name: ko.observable()
	};

	var addDish = function(){
		this.time = time();
		this.date = rationVM.selectedDate();
		dataStore.addedDishes.push(this);
		console.log(dataStore.addedDishes());
	};

	var total = ko.computed(function(){
		return {
			protein: rationVM.total.protein(),
			fats: rationVM.total.fats(),
			carbohydrate: rationVM.total.carbohydrate(),
			kcal: rationVM.total.kcal(),
		}
	});

	var allowed = function(prop, num){
		return total()[prop] + num > limitation[prop]();
	};

	var showmsg = ko.computed(function(){
		for (var key in total()){
			if ( allowed(key, total()[key]) ){
				return key;
			}
		}		

	});

	var filteredDishes = ko.computed(function(){
		var names = ko.utils.arrayFilter(dishes(), function(item) {
			return !filter.name() ? true : (item.name.indexOf(filter.name()) != -1);
		});

		var types = ko.utils.arrayFilter(names, function(item) {
			return !filter.type() ? true : (item.type.indexOf(filter.type()) != -1);
		});

		var result = ko.utils.arrayFilter(types, function(item) {
			return !filter.excludeComp() ? true : (item.components.indexOf(filter.excludeComp()) < 0);
		});

		return result;
	});

	return {
		dishes: dishes,
		time: time,
		addDish: addDish,
		limitation: limitation,
		filteredDishes: filteredDishes,
		choose: choose,
		filter: filter,
		total: total,
		allowed: allowed,
		showmsg: showmsg
	}
};


var dishesVM = new DishesViewModel();


var data = function(items) {

	var components = [];
	var types = [];

	$.each(items, function(i){

		for(var j=0; j < items[i].components.length; j++) {
			if (components.indexOf(items[i].components[j]) < 0) {
				components.push(items[i].components[j]);
			}
		}

		if (types.indexOf(items[i].type) < 0) {
			types.push(items[i].type);
		}

	});

	dishesVM.dishes(items);
	dishesVM.choose.components(components);
	dishesVM.choose.types(types);
};
data(Data())


/*
$.getJSON('./dishes.json', function(items) {

	var components = [];
	var types = [];

	$.each(items, function(i){

		for(var j=0; j < items[i].components.length; j++) {
			if (components.indexOf(items[i].components[j]) < 0) {
				components.push(items[i].components[j]);
			}
		}

		if (types.indexOf(items[i].type) < 0) {
			types.push(items[i].type);
		}

	});

	dishesVM.dishes(items);
	dishesVM.choose.components(components);
	dishesVM.choose.types(types);
});
*/