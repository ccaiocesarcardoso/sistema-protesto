
// ==========================================
// 6. INTEGRAÇÃO WHATSAPP (NOVA)
// ==========================================

function getDadosAtuais() {
    let sufixo = "";
    let tipoOrcamento = "CPF/CNPJ - Liq/Desistência";
    let idResumo = "resumoSelos";
    let idTotal = "totalGeral";

    if (document.getElementById('page-cancelamento').style.display === 'block') {
        sufixo = "Cancel";
        tipoOrcamento = "CPF/CNPJ - Cancelamento";
        idResumo = "resumoCancelamento";
        idTotal = "totalGeralCancel";
    }
    else if (document.getElementById('page-me-liquidacao').style.display === 'block') {
        sufixo = "MELiq";
        tipoOrcamento = "ME - Liq/Desistência";
        idResumo = "resumoMELiq";
        idTotal = "totalGeralMELiq";
    }
    else if (document.getElementById('page-me-cancelamento').style.display === 'block') {
        sufixo = "MECancel";
        tipoOrcamento = "ME - Cancelamento";
        idResumo = "resumoMECancel";
        idTotal = "totalGeralMECancel";
    }
    else if (document.getElementById('page-certidoes').style.display === 'block') {
        tipoOrcamento = "Certidão de Protesto";
        idResumo = "resumoCertidao";
        idTotal = "totalGeralCertidao";
        const devedor = document.getElementById('nomeCertidao').value || "---";
        return {
            tipo: tipoOrcamento,
            credor: "---",
            devedor: devedor,
            valorTitulo: "0.00",
            total: document.getElementById(idTotal).innerText,
            detalhes: document.getElementById(idResumo).innerHTML
        };
    }

    const credor = (document.getElementById('credor' + sufixo) || {}).value || "---";
    const devedor = (document.getElementById('devedor' + sufixo) || {}).value || "---";
    const valorTitulo = (document.getElementById('valorTitulo' + sufixo) || {}).value || "0.00";
    const total = document.getElementById(idTotal).innerText;
    const detalhamento = document.getElementById(idResumo).innerHTML;

    return {
        tipo: tipoOrcamento,
        credor: credor,
        devedor: devedor,
        valorTitulo: valorTitulo,
        total: total,
        detalhes: detalhamento
    };
}

function enviarWhatsAppDireto() {
    const dados = getDadosAtuais();

    // Mesma lógica de validação e envio do histórico
    let numDigitado = prompt("Digite o número do WhatsApp com DDD (Ex: 62988887777):");
    if (!numDigitado) return;

    let numLimpo = numDigitado.replace(/\D/g, '');
    if (numLimpo.length > 0 && numLimpo.length <= 11) {
        numLimpo = "55" + numLimpo;
    }

    // Formata detalhes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = dados.detalhes;
    let detalhamentoFormatado = "";
    const blocos = tempDiv.querySelectorAll('.detalhe-calculo');

    blocos.forEach(bloco => {
        const titulo = bloco.querySelector('strong')?.innerText || "";
        const calculo = bloco.querySelector('small')?.innerText || "";
        const totalLinha = bloco.querySelector('span')?.innerText || "";
        detalhamentoFormatado += `*${titulo}*%0A`;
        if (calculo) detalhamentoFormatado += `${calculo} (Emol. Fund. ISS)%0A`;
        detalhamentoFormatado += `*${totalLinha}*%0A%0A`;
    });

    const mensagem = `*ORÇAMENTO DE PROTESTO - 2026*%0A` +
        `----------------------------------%0A` +
        `*Serviço:* ${dados.tipo}%0A` +
        `*Devedor:* ${dados.devedor}%0A` +
        `*Credor:* ${dados.credor}%0A` +
        `*Valor do Título:* R$ ${parseFloat(dados.valorTitulo).toFixed(2).replace('.', ',')}%0A` +
        `----------------------------------%0A` +
        `*DETALHAMENTO DAS CUSTAS:*%0A%0A` +
        `${detalhamentoFormatado}` +
        `----------------------------------%0A` +
        `*TOTAL GERAL: ${dados.total}*%0A` +
        `----------------------------------%0A` +
        `_Enviado via Sistema Calculadora de Custas de Protesto_`;

    const url = `https://wa.me/${numLimpo}?text=${mensagem}`;
    window.open(url, '_blank');
}
