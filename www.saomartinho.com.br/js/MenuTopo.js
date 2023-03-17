﻿$(document).ready(function () {

    //// Paginação
    //$('div[class*=paglist] > a').wrap('<li></li>');
    //$('div[class*=paglist]').wrapInner('<ul class="pager"></ul>');  
    //$('li a.navMarcada').parent().addClass('active');

    $('div#mailEnviarAmigo').insertAfter('div.txt-show');

    $('#favoritoLink').attr('title', 'Download');

    if ($(".hidLinguagem").val() == "ptg") {
        $('#txtNomeFavorito').attr('placeholder', 'Digite o nome da página');
    }
    else {
        $('#txtNomeFavorito').attr('placeholder', 'Enter the page name');
    }

    $('li#idFavotitos img[id*=webControlMarcarFavorito]').remove();
    $('a#favoritoLink img').remove();

    $('li[id*=idFavotitos] > a').wrapInner('<span class="icon-favorito"></span>');
   

});

var tam = 11;
function mudaFonte(tipo) {
    var incremento = 0;
    if (tipo == "mais") {
        if (tam < 16) {
            tam += 1;
            incremento = 1;
        }
    } else if (tam > 11) {
        tam -= 1;
        incremento = -1;
    }

    createCookie('fonte', tam, 365);
    setFontWithChildrens($('.txt-show'), incremento);
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function setFontWithChildrens(obj, incremento) {
    var tamFonte = obj.css('font-size');
    tamFonte = (convertStringFontSizeEmIntFontSize(tamFonte) + incremento).toString() + "px";

    obj.css('font-size', tamFonte);

    obj.children().each(function () {
        setFontWithChildrens($(this), incremento);
    });
}

function convertStringFontSizeEmIntFontSize(fonteSize) {
    if (!fonteSize)
        return;

    var len = fonteSize.length;
    //Para tirar o px do font-size, 
    // ex 11px --> 11

    var str = fonteSize.substr(0, len - 2);
    return Number(str);
}

//Configuração do Addthis para retirar o ícone de impressão
var addthis_config =
{
    services_exclude: 'print'
}

function imprimirClick() {
    imprimir("", "", "");
}

//Método para imprimir o conteúdo de uma página.
function executaImpressao(id) {
    printPage('./Impressao.aspx?idMateria=' + id);
}

function setPrint() {
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.focus(); // Required for IE
    this.contentWindow.print();
}

function printPage(sURL) {
    var oHiddFrame = document.createElement("iframe");
    oHiddFrame.onload = setPrint;
    oHiddFrame.style.visibility = "hidden";
    oHiddFrame.style.position = "fixed";
    oHiddFrame.style.right = "0";
    oHiddFrame.style.bottom = "0";
    oHiddFrame.src = sURL;
    document.body.appendChild(oHiddFrame);
}

function imprimir(txTitulo, txSubTitulo, txConteudo, txtituloRI) {
    CallServer("impressao;" + txTitulo + ";" + txSubTitulo + ";" + txConteudo + ";" + txtituloRI);
}

function enviaEmail() {
    var nomeDestinatario = $('#controlEmailNomeDest').val().replace(";", ",");
    var emailDestinatario = $('#controlEmailDest').val().replace(";", ",");
    var seuNome = $('#controlEmailSeuNome').val().replace(";", ",");
    var seuEmail = $('#controlEmailSeuEmail').val().replace(";", ",");
    var comentario = $('#controlEmailComentario').val().replace(";", ",");
    CallServer("emailAmigo;" + emailDestinatario + ";" + nomeDestinatario + ";" + seuEmail + ";" + seuNome + ";" + comentario + ";" + location.href);
}

function fechaBoxEmail() {
    window.location.reload();
}

function filtrarAno() {
    var ano = $('select[id$=ddlAnoFiltro]').val();
    ano = parseInt(ano);
    if (!isNaN(ano)) {
        efetuarFiltroPorAno(ano);
    }
    else {
        limpaFiltroPorAno();
    }
}


