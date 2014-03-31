ko.bindingHandlers.calendar = {
    init: function (element, valueAccessor) {
        var selectedDate = valueAccessor();

        $(element).datepicker({
            startDate: selectedDate()
        }).on('changeDate', function (e) {
            selectedDate(e.date.toDateString());
        });

    }
};