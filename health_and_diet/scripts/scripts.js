var viewModel = (function () {
    var today = new Date();

    var self = {
        _tasks: {}
    };

    self._tasks[getKey(today)] = ko.observableArray([{ text: ko.observable('Доделать 1 домашнее задание'), completed: ko.observable(false) }, { text: ko.observable('Проверить 1 домашнее задание'), completed: ko.observable(true) }]);

    var viewModel = {
        currentDate: ko.observable(today),
        tasks: ko.observableArray([])
    };


    viewModel.currentDate.subscribe(applyTasks);

    applyTasks(viewModel.currentDate());

    viewModel.taskToAdd = ko.observable('');
    viewModel.taskToAdd.isValid = ko.computed(function () {
        var val = viewModel.taskToAdd().trim();
        return val.length > 0;
    });
    viewModel.taskToAdd.isModified = ko.observable(false);

    viewModel.addTask = function () {
        if (!viewModel.taskToAdd.isValid()) {
            viewModel.taskToAdd.isModified(true);
            return;
        }

        viewModel.tasks.push({ text: ko.observable(viewModel.taskToAdd()), completed: ko.observable(false) });
        viewModel.taskToAdd.isModified(false);
        viewModel.taskToAdd('');
    };
    viewModel.removeTask = function (item) {
        viewModel.tasks.remove(item);
    };
    viewModel.toggleCompleted = function (item) {
        item.completed(!item.completed());
    };

    viewModel.filter = ko.observable('');
    viewModel.filteredTasks = ko.computed(function () {
        var filter = viewModel.filter().trim();

        if (filter.length < 1) {
            return viewModel.tasks();
        }

        var result = [];

        _.each(viewModel.tasks(), function (item) {
            if (item.text.indexOf(filter) > -1) {
                result.push(item);
            }
        });

        return result;

    });

    return viewModel;


    function getKey(date) {
        return "" + date.getFullYear() + date.getMonth() + date.getDate();
    }

    function applyTasks(date) {
        if (!self._tasks[getKey(date)]) {
            self._tasks[getKey(date)] = ko.observableArray([]);
        }

        viewModel.tasks(self._tasks[getKey(date)]());
    }

})();

ko.applyBindings(viewModel);

