function SettingsViewModel(){

	var limitation = {
		protein: ko.observable(50),
		fats: ko.observable(25),
		carbohydrate: ko.observable(250),
		kcal: ko.observable(1500)
	};

	var total = dataStore.total;

	var left = {
		protein: ko.computed(function(){
			return (limitation.protein() - total().protein()).toFixed(1);
		}),
		fats: ko.computed(function(){
			return (limitation.fats() - total().fats()).toFixed(1);
		}),
		carbohydrate: ko.computed(function(){
			return (limitation.carbohydrate() - total().carbohydrate()).toFixed(1);
		}),
		kcal: ko.computed(function(){
			return (limitation.kcal() - total().kcal()).toFixed(1);
		})
	};	
	
	// var selectedDate = ko.observable(new Date());

	return {
		limitation: limitation,
		// selectedDate: selectedDate,
		left: left
	}
};

var settingsVM = new SettingsViewModel();