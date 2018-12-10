$(document).on('change', '.VHB', function () {
    //$(C).val(), $(C).attr("class")
    BuildFe();
});

$(document).on('change', '.contrainte', function () {
    var parentdiv = $(this).parent();
    BuildCparam($(this), parentdiv);

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

    //Bouton Valider
    $('#goBTN').click(function () {
        var arr = [0]; //constante 0
        arr = arr.concat(GetHB()); //Ajout des variables hors base

        var It = new Iteration();
        GetContraintes().forEach(function (c, i) {
            var resultat = c.splice(-1, 1);
            It.addContrainte(new Contrainte(c, resultat));
            console.log(It.contraintes[i])
        })
        It.logic();

        console.log("-----test reception des données-----\n");
        console.log("  -Variables Hors base: ", GetHB());
        console.log("  -Contraintes ", GetContraintes());
        console.log("  -Lancement du programme avec :", arr);
        console.log("------------------------------------\n");



    })

})

function GenerateFields(cas, n) {

    switch (cas) {
        case 'C':

            var Fields = $('#Generated_CFields');
            Fields.html(''); //Vider d'abord
            for (var i = 0; i < n; i++) { //Générer n champs
                Fields.append('<div style="margin:15px;">' +
                    '<label for="InputsC">Contrainte ' + (i + 1) + '</label>' +
                    '<input class="form-control contrainte" min="0" max="10" placeholder="nombre de paramètres" type="number" id="' + (i + 1) + '">' +
                    '</div>');
            }
            break;

        case 'HB':

            var Fields = $('#Generated_HBFields');
            Fields.html(''); //Vider d'abord
            for (var i = 0; i < n; i++) { //Générer n champs

                Fields.append('<div style="margin:15px;">' +
                    '<label for="InputsHB">Variable ' + (i + 1) + '</label>' +
                    '<input class="form-control VHB" type="text" id="' + (i + 1) + '">' +
                    '</div>');
            }
            break;

        default:
            break;
    }
}

//Build Fonction Economique
function BuildFe() {
    $('#FE').val('');
    GetHB().forEach(function (hb, i) {
        $('#FE').get(0).value += hb + "X" + i + " ";
    });
}


function BuildCparam(input, parentdiv) {
    var iD = 'Generate_Params' + $(input).attr('id');
    var jiD = '#' + iD;
    var ival = $(input).val();

    if (!$(jiD).length) {
        $(parentdiv).append('<div id="' + iD + '" class="gen"> a </div>');
    }

    $(jiD).html('');

    for (var i = 0; i < ival; i++) {

        if (i == (ival - 1)) {
            $(jiD).append(' = <input class="form-control" type="text" id="Param' + i + '">');
        } else {
            $(jiD).append(' <input class="form-control" type="text" id="Param' + i + '">');
        }
    }
}



function GetHB() {
    var HB = [];
    Array.from($("#Generated_HBFields  :input")).forEach(function (hb) {
        var val = $(hb).val();
        if (val == 0) HB.push(0);
        else HB.push(parseInt(val));

    });
    return HB
}

function GetContraintes() {
    var Contraintes = [];

    Array.from($('[id^=Generate_Params]')).forEach(function (c, i) {
        var Param = [];
        Array.from($(c).find('input')).forEach(function (param, j) {
            Param[j] = parseInt($(param).val());
        })
        Contraintes[i] = Param;
    });
    return Contraintes
}