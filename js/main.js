$(document).ready(function () {

    console.log("main.js is ready ");

    $("#Inputs").bind('keyup mouseup', function () {
        GenerateFields($(this).val());
    });

})

function GenerateFields(number) {

    var div = $('#Generated_Fields');

    div.html('');

    for (var i = 0; i < number; i++) {
        div.append('<div class="contrainte"><label for="Inputs">Contrainte ' + (i + 1) + '</label><input class="form-control" type="text" id="contrainte' + (i + 1) + '"></div>');
    }

}