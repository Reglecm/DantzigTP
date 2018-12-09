$(document).ready(function () {

    console.log("main.js is ready ");

    //Au changement de valeur générer les champs
    $("#Inputs").bind('keyup mouseup', function () {
        GenerateFields($(this).val());
    });

})

function GenerateFields(n) {

    var div = $('#Generated_Fields');

    //Vider d'abord
    div.html('');

    //Générer n champs
    for (var i = 0; i < n; i++) {
        div.append('<div class="contrainte"><label for="Inputs">Contrainte ' + (i + 1) + '</label><input class="form-control" type="text" id="contrainte' + (i + 1) + '"></div>');
    }

}