$(function () {
    $("textarea").on('keypress', function (e) {
        if (e.ctrlKey && (e.keyCode == 13 || e.keyCode == 10)) {
            $(this).closest('form').submit();
        }
    });
});