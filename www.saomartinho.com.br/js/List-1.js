function efetuarFiltroPorAno() {

    if (document.location.href.toLowerCase().indexOf("list.aspx") > 0)
    {
        window.location = "List.aspx?idCanal=" + getIdCanal() + "&ano=" + $('select[id$=ddlAnoFiltro] option:selected').val();
    } else
    {
        window.location = "ListReleases.aspx?idCanal=" + getIdCanal() + "&ano=" + $('select[id$=ddlAnoFiltro] option:selected').val();
    }

}

function limpaFiltroPorAno() {

    if (document.location.href.toLowerCase().indexOf("list.aspx") > 0) {
        window.location = "List.aspx?idCanal=" + getIdCanal();
    } else {
        window.location = "ListReleases.aspx?idCanal=" + getIdCanal();
    }
    
}

function getIdCanal() {
    var strReturn = "";
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}

$(document).ready(function () { 

    $('.classMenuInterno').addClass('col-md-2');
    $('.classConteudo').addClass('col-md-7');

    $('select[id*=ddlAnoFiltro] option:selected').each(function () {
        if ($(this).text().toLowerCase() === "todos" || $(this).text().toLowerCase() === "all")
            return;

        var value = $(this).val();

        $('#anoAtual').append(value);
    });

    $('a[id*=linkListaTituloChamada]').each(function () {
        var link = $(this).attr('href');
        $(this).parent().find('a#linkDownload').attr('href', link);
    });

    $("a[id*=linkListaTituloChamada]").each(function () {
        var link = $(this).attr('href');
        if (link.indexOf("Show") != -1) {
            $(this).parent().find('a[id*=linkDownload]').remove();
            $(this).parent().find('span[class*=icon-pdf2]').remove();
            $(this).parent().find('em[id*=tamanhoArquivo]').remove();
        } 
        
    });

});

