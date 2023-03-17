$(document).ready(function () {
    $('input[id*=txtTelefone]').setMask("(99)9999 99999");

    function GetQueryStringParams(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
    var nome = GetQueryStringParams('nome');
    var email = GetQueryStringParams('email');

    if (nome != undefined) {
        $('input[id*=txtNomeContato]').val(nome);
    }
    if (email != undefined) {
        $('input[id*=txtEmail]').val(email);
    }
});

function Limpar() {
    $('#formFaleComRi').find('input:text, textarea, input:password').val('');
}





