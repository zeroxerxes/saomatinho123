$(document).ready(function() {
	
	
	
	
	$('div[id$="owl-destaques"]').find('p').each(function () {
        var texto = $(this).text(); 
        if(texto.includes("[") && texto.includes("]"))
		{
			$(this).html('');
			var textoTratado = texto.replaceAll('[','<').replaceAll(']','>');
			$(this).append(textoTratado);
		}
	});
	

    // Busca
    $(".inputBusca").keypress(function(event) {
        event = event || window.event;

        if (event.keyCode == '13') {
            Buscar();

            event.preventDefault();
        }
    });


	$(".menu li:nth-child(4) a").removeAttr('data-toggle');
    $(".menu li:nth-child(6) a").removeAttr('data-toggle');

    $(".sidr-inner .inputBusca").keypress(function (event) {
        event = event || window.event;

        if (event.keyCode == '13') {
            BuscarMobile();

            event.preventDefault();
        }
    });

    $(".inputOk").click(function() {
        Buscar();
        event.preventDefault();
    });

    $(".sidr-inner .inputOkMobile").click(function () {
        BuscarMobile();
        event.preventDefault();
    });

    $('.btnX').click(function() {
        mostrarTextoSemFavoritos();
    });

    $('.btn_incluir').click(function() {
        mostrarTextoSemFavoritos();
    });

    $("label").each(function () {
        if ($.trim($(this).html()) == "")
            $(this).remove();
    });   

    var avisoUsoCookie = docCookies.getItem("avisoCookie");
    if (avisoUsoCookie == null) {
        $(".alertaLGPD").attr("style", "display:flex;");
    }

});

function setCookie() {
    var d = new Date();
    var cname = "avisoCookie";
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = d.toDateString();
    //15552000 são 180 dias 
    docCookies.setItem(cname, expires, 15552000);
    $(".alertaLGPD").attr("style", "display:none");
}



function Buscar() {
    var buscada = $(".inputBusca").val().replace(/"/g, "");
    window.location = "ListaBusca.aspx?busca=" + buscada;
}

function BuscarMobile() {
    var buscada = $(".sidr-inner .inputBusca").val().replace(/"/g, "");
    window.location = "ListaBusca.aspx?busca=" + buscada;
}

function Trim(str) { return str.replace(/^\s+|\s+$/g, ""); }

function irParaTopo() { $('html, body').animate({ scrollTop: 0 }, 'slow'); }

function retornoCallback(arg) {
    var args = arg.split(';');

    switch (args[0]) {
        case "impressao":
            {
                executaImpressao(args[1]);
                break;
            }
        case "buscarShow":
            {
                alert(args[1]);
                break;
            }
        case "email":
            {
                if (args[1] == "success") {
                    alert(args[2]);
                    fechaBoxEmail();
                }
                else
                    alert(args[2]);
                break;
            }
        case "novaDescricaoTriResponse":
            exibirNovaDescricao(args[1], args[2]);
            break;
        case "lembreteAgenda":
            var alertagenda = $('input[id$=MsgLembreteAgenda]').val();
            limparCamposAgenda();
            alert(alertagenda);
            break;
        case "paginarResponse":
            efetuarPaginacaoResponse(args[1], args[2]);
            break;
        case "alerta":
            {
                var alertari = $('input[id$=MsgSucessoRi]').val();
                alert(alertari);
                fechaBoxAlerta();
                limpaModal();
                break;
            }
        case "alertaContatoExiste":
            {
                var mensagem = unescape(args[1]);
                eval(mensagem);
                fechaBoxAlerta();
                limpaModal();
                break;
            }
        case "EventosAnteriores":
            {
                carregarEventosAnteriores(args);
                break;
            }
        case "EventosProximos":
            {
                carregarEventosProximos(args);
                break;
            }
        case "paginarcalendarioresponsive":
            {
                montaEventosCalendario(args[1]);
                mostraEventosDoDiaSelecionadoPosMudancaMes();
                break;
            }
        case "captchaIvalido":
            {
                var textoAlerta = $('input[id$=MsgErroCaptcha]').val();
                alert(textoAlerta);
                break;
            }
        default:
            break;
    }
}

function erroCallback(err) {
    alert("erro:" + err);
}