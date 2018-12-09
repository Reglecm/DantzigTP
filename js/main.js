$(document).on('change', '.VHB', function () {
    //$(C).val(), $(C).attr("class")
    BuildFe();
});

$(document).ready(function () {

    console.log("main.js is ready ");

    //Au changement de valeur générer les champs
    $('[id^=Inputs]').bind('keyup mouseup', function () {

        switch ($(this).attr('id')) {
            case 'InputsHB':
                GenerateFields('HB', $(this).val());
                break;

            case 'InputsC':
                GenerateFields('C', $(this).val());
                break;

            default:
                break;
        }
    });

    //Build Fonction Economique


})

function GenerateFields(cas, n) {

    switch (cas) {
        case 'C':

            var Fields = $('#Generated_CFields');
            Fields.html(''); //Vider d'abord
            for (var i = 0; i < n; i++) { //Générer n champs
                Fields.append('<div style="margin:15px;">' +
                    '<label for="InputsC">Contrainte ' + (i + 1) + '</label>' +
                    '<input class="form-control contrainte" type="text" id="' + (i + 1) + '">' +
                    '</div>');
            }
            break;

        case 'HB':

            var Fields = $('#Generated_HBFields');
            Fields.html(''); //Vider d'abord
            for (var i = 0; i < n; i++) { //Générer n champs

                var br = "";
                if (i == 5) {
                    br = "<br/>"
                }
                Fields.append('<div style="margin:15px;">' +
                    '<label for="InputsHB">Variable ' + (i + 1) + '</label>' +
                    '<input class="form-control VHB" type="text" id="' + (i + 1) + '">' +
                    '</div>' + br);
            }
            break;

        default:
            break;
    }


}

function BuildFe() {
    console.log('in')
    $('#FE').val('');
    GetHB().forEach(function (hb, i) {
        $('#FE').get(0).value += hb + "X" + i + " ";
    });

}


function GetHB() {
    var HB = [];
    Array.from($("#Generated_HBFields  :input")).forEach(function (hb) {
        var val = $(hb).val();
        if (val == 0) HB.push(0);
        else HB.push(val);

    });
    return HB
}



// //Bouton Valider
// $('#goBTN').click(function () {
//     GetContraintes();
// })




function Main() {

}