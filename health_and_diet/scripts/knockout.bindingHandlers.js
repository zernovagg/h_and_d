ko.bindingHandlers.calendar = {
    init: function (element, valueAccessor) {
        var date = valueAccessor();

        $(element).datetimepicker({
            pickTime: false,
            language: 'ru',
            defaultDate: date(),
        }).on("dp.change", function (e) {
            date(e.date._d);
        });
    },
    update: function () {

    }
};

ko.bindingHandlers.editableText = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        $(element)
            .attr('contentEditable', true)
            .text(ko.unwrap(value))
            .on('blur', function () {
                value($(this).text());
            });
    },
    update: function (element, valueAccessor) {
        var value = valueAccessor();
        $(element).text(ko.unwrap(value));
    }
}