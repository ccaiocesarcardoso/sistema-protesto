// ==========================================
// CONFIGURAÇÃO DA LICENÇA
// ==========================================
const LICENCA_SISTEMA = {
    cliente: "Cliente Teste - Goiânia",
    validade: "2026-12-31", // Data no formato Ano-Mês-Dia
    status: "Ativa"
};

function verificarValidadeLicenca() {
    const hoje = new Date();
    const dataExpira = new Date(LICENCA_SISTEMA.validade);

    if (hoje > dataExpira) {
        alert("ALERTA: A licença deste sistema expirou em " + dataExpira.toLocaleDateString() + ". Entre em contato com a Softwiki Tecnologia.");
        document.body.innerHTML = `
            <div style="text-align:center; margin-top:100px; font-family:sans-serif;">
                <h1 style="color:#e74c3c;">Licença Expirada</h1>
                <p>O período de uso licenciado chegou ao fim.</p>
                <p>Contato: www.softwiki.com.br</p>
            </div>`;
        return false;
    }
    return true;
}

// ==========================================
// 1. NAVEGAÇÃO E TROCA DE PÁGINAS
// ==========================================
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.style.display = 'none');

    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }

    const titles = {
        'home': 'Início - Sistema de Orçamentos',
        'calculo': 'Orçamento de Liquidação/Desistência',
        'cancelamento': 'Orçamento de Cancelamento de Protesto',
        'me-liquidacao': 'ME - Liquidação/Desistência',
        'me-cancelamento': 'ME - Cancelamento de Protesto',
        'certidoes': 'Certidões de Protesto',
        'historico': 'Histórico de Orçamentos',
        'tabela': 'Tabela de Emolumentos 2026'
    };
    const titleElement = document.getElementById('page-title');
    if (titleElement) titleElement.innerText = titles[pageId] || 'Sistema Protesto';

    if (pageId === 'tabela') {
        renderTabelaCompleta();
    }
}

// ==========================================
// 2. LÓGICA DA TABELA DE CONSULTA
// ==========================================
function renderTabelaCompleta() {
    const corpo = document.getElementById('corpoTabela');
    if (!corpo || typeof TABELA_DADOS === 'undefined') {
        console.error("Erro: Base de dados TABELA_DADOS não encontrada.");
        return;
    }
    corpo.innerHTML = "";
    corpo.innerHTML = TABELA_DADOS.map(item => {
        const v25 = (item.v25 === null || item.v25 === 0) ? "0" : "R$ " + item.v25.toFixed(2);
        const v26 = (item.v26 === null || item.v26 === 0) ? "0" : "R$ " + item.v26.toFixed(2);
        const jud = (item.jud === null || item.jud === 0) ? "0" : "R$ " + item.jud.toFixed(2);
        return `
            <tr>
                <td style="text-align: center;"><strong>${item.id}</strong></td>
                <td style="font-size: 0.85em; max-width: 400px; color: #555;">${item.desc}</td>
                <td style="color: #7f8c8d;">${v25}</td>
                <td class="valor-destaque" style="color: #27ae60; font-weight: bold;">${v26}</td>
                <td style="color: #e67e22; font-weight: 500;">${jud}</td>
            </tr>
        `;
    }).join('');
}

function filtrarTabela() {
    const input = document.getElementById('buscaTabela').value.toUpperCase();
    const rows = document.querySelectorAll('#corpoTabela tr');
    rows.forEach(row => {
        const text = row.innerText.toUpperCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

// ==========================================
// 3. FUNÇÕES DE BUSCA (FAIXAS DE VALORES)
// ==========================================

function buscarEmolumentoProtesto(valor) {
    if (valor <= 0) return { id: "---", valor: 0 };
    if (valor <= 65.38) return { id: 3081, valor: 16.68 };
    if (valor <= 130.76) return { id: 3082, valor: 24.13 };
    if (valor <= 261.52) return { id: 3083, valor: 44.53 };
    if (valor <= 392.29) return { id: 3084, valor: 68.66 };
    if (valor <= 523.05) return { id: 3085, valor: 109.48 };
    if (valor <= 653.80) return { id: 3086, valor: 124.33 };
    if (valor <= 1307.62) return { id: 3087, valor: 168.88 };
    if (valor <= 2615.24) return { id: 3088, valor: 228.27 };
    if (valor <= 6538.10) return { id: 3089, valor: 302.48 };
    if (valor <= 13076.18) return { id: 3090, valor: 458.36 };
    if (valor <= 26152.37) return { id: 3091, valor: 604.96 };
    return { id: 3092, valor: 757.12 };
}

function buscarEmolumentoCancelamento(valor) {
    if (valor <= 0) return { id: "---", valor: 0 };
    if (valor <= 65.38) return { id: 3132, valor: 25.02 };
    if (valor <= 130.76) return { id: 3133, valor: 36.20 };
    if (valor <= 261.52) return { id: 3134, valor: 66.80 };
    if (valor <= 392.29) return { id: 3135, valor: 102.99 };
    if (valor <= 523.05) return { id: 3136, valor: 164.22 };
    if (valor <= 653.80) return { id: 3137, valor: 186.50 };
    if (valor <= 1307.62) return { id: 3138, valor: 253.32 };
    if (valor <= 2615.24) return { id: 3139, valor: 342.41 };
    if (valor <= 6538.10) return { id: 3140, valor: 453.72 };
    if (valor <= 13076.18) return { id: 3141, valor: 687.54 };
    if (valor <= 26152.37) return { id: 3142, valor: 907.44 };
    return { id: 3143, valor: 1135.68 };
}

function buscarProtMECancelamento(valor) {
    if (valor <= 0) return { id: "---", valor: 0 };
    if (valor <= 65.38) return { id: 3197, valor: 25.02 };
    if (valor <= 130.76) return { id: 3198, valor: 36.20 };
    if (valor <= 261.52) return { id: 3199, valor: 66.80 };
    if (valor <= 392.29) return { id: 3200, valor: 102.99 };
    if (valor <= 523.05) return { id: 3201, valor: 164.22 };
    if (valor <= 653.80) return { id: 3202, valor: 186.50 };
    if (valor <= 1307.62) return { id: 3203, valor: 253.32 };
    if (valor <= 2615.24) return { id: 3204, valor: 342.41 };
    if (valor <= 6538.10) return { id: 3205, valor: 453.72 };
    if (valor <= 13076.18) return { id: 3206, valor: 687.54 };
    if (valor <= 26152.37) return { id: 3207, valor: 907.44 };
    return { id: 3208, valor: 1135.68 };
}

// ==========================================
// 4. FUNÇÕES DE CÁLCULO PRINCIPAIS
// ==========================================

function calcular() {
    const valorTitulo = parseFloat(document.getElementById('valorTitulo').value) || 0;
    const taxaCorreio = parseFloat(document.getElementById('taxaCorreio').value) || 0;
    const qtdDevedores = parseInt(document.getElementById('qtdDevedores').value) || 1;
    const issPerc = parseFloat(document.getElementById('iss').value) || 5;
    const ALIQUOTA_FUNDOS = 0.2425;
    const ISS_FATOR = issPerc / 100;
    const idApontamento = 3080;
    const vJudiciario = 17.68;
    const idIntimacao = 3093;
    const vBaseInt = 7.43 * qtdDevedores;
    const fInt = vBaseInt * ALIQUOTA_FUNDOS;
    const iInt = vBaseInt * ISS_FATOR;
    const subTotalInt = vBaseInt + fInt + iInt;
    const dadosProtesto = buscarEmolumentoProtesto(valorTitulo);
    const vBaseProt = dadosProtesto.valor;
    const fProt = vBaseProt * ALIQUOTA_FUNDOS;
    const iProt = vBaseProt * ISS_FATOR;
    const subTotalProt = vBaseProt + fProt + iProt;
    const totalGeral = vJudiciario + subTotalInt + subTotalProt + taxaCorreio;

    document.getElementById('resumoSelos').innerHTML = `
    <i class="fa-solid fa-file-invoice-dollar" style="font-size: 30px; color: var(--primary); margin-bottom: 15px; display: block;"></i>
    <div class="detalhe-calculo">
        <strong>Apontamento (ID ${idApontamento}):</strong><br>
        <span>Taxa Judiciária: R$ ${vJudiciario.toFixed(2)}</span>
    </div>
    <div class="detalhe-calculo">
        <strong>Intimação (ID ${idIntimacao}):</strong><br>
        <small>${vBaseInt.toFixed(2)} + ${fInt.toFixed(2)} + ${iInt.toFixed(2)}</small>
        <small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><br>
        <span>Total: R$ ${subTotalInt.toFixed(2)}</span>
    </div>
    <div class="detalhe-calculo protesto-destaque">
        <strong>Protesto/Liquidação (ID ${dadosProtesto.id}):</strong><br>
        <small>${vBaseProt.toFixed(2)} + ${fProt.toFixed(2)} + ${iProt.toFixed(2)}</small>
        <small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><br>
        <span>Total: R$ ${subTotalProt.toFixed(2)}</span>
    </div>`;
    document.getElementById('totalGeral').innerText = totalGeral.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calcularCancelamento() {
    const valorTitulo = parseFloat(document.getElementById('valorTituloCancel').value) || 0;
    const taxaCorreio = parseFloat(document.getElementById('taxaCorreioCancel').value) || 0;
    const qtd = parseInt(document.getElementById('qtdDevedoresCancel').value) || 1;
    const issPerc = parseFloat(document.getElementById('issCancel').value) || 5;
    const ALIQUOTA_FUNDOS = 0.2425;
    const ISS_FATOR = issPerc / 100;
    const vJudiciario = 17.68;
    const vBaseInt = 11.15 * qtd;
    const fInt = vBaseInt * ALIQUOTA_FUNDOS;
    const iInt = vBaseInt * ISS_FATOR;
    const subTotalInt = vBaseInt + fInt + iInt;
    const dadosCancel = buscarEmolumentoCancelamento(valorTitulo);
    const vBaseCan = dadosCancel.valor;
    const fCan = vBaseCan * ALIQUOTA_FUNDOS;
    const iCan = vBaseCan * ISS_FATOR;
    const subTotalCan = vBaseCan + fCan + iCan;
    const vBaseAve = 55.67;
    const fAve = vBaseAve * ALIQUOTA_FUNDOS;
    const iAve = vBaseAve * ISS_FATOR;
    const subTotalAve = vBaseAve + fAve + iAve;
    const totalGeral = vJudiciario + subTotalInt + subTotalCan + subTotalAve + taxaCorreio;

    document.getElementById('resumoCancelamento').innerHTML = `
        <i class="fa-solid fa-ban" style="font-size: 30px; color: var(--primary); margin-bottom: 15px; display: block;"></i>
        <div class="detalhe-calculo">
            <strong>Apontamento (3131):</strong><br>
            <span>R$ ${vJudiciario.toFixed(2)}</span>
        </div>
        <div class="detalhe-calculo">
            <strong>Intimação (3144):</strong><br>
            <small>${vBaseInt.toFixed(2)} + ${fInt.toFixed(2)} + ${iInt.toFixed(2)}</small>
            <small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small>
            <span>Total: R$ ${subTotalInt.toFixed(2)}</span>
        </div>
        <div class="detalhe-calculo">
            <strong>Cancelamento (${dadosCancel.id}):</strong><br>
            <small>${vBaseCan.toFixed(2)} + ${fCan.toFixed(2)} + ${iCan.toFixed(2)}</small>
            <small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small>
            <span>Total: R$ ${subTotalCan.toFixed(2)}</span>
        </div>
        <div class="detalhe-calculo averbacao-box">
            <strong>Averbação (3145):</strong><br>
            <small>${vBaseAve.toFixed(2)} + ${fAve.toFixed(2)} + ${iAve.toFixed(2)}</small>
            <small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small>
            <span>Total: R$ ${subTotalAve.toFixed(2)}</span>
        </div>`;
    document.getElementById('totalGeralCancel').innerText = totalGeral.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calcularMECancelamento() {
    const valorTitulo = parseFloat(document.getElementById('valorTituloMECancel').value) || 0;
    const qtd = parseInt(document.getElementById('qtdMECancel').value) || 1;
    const issPerc = parseFloat(document.getElementById('issMECancel').value) || 5;
    const taxaCorreio = parseFloat(document.getElementById('taxaCorreioMECancel').value) || 0;
    const ALIQUOTA_FUNDOS = 0.2425;
    const ISS_FATOR = issPerc / 100;
    const vJudiciario = 0;
    const vBaseInt = 11.15 * qtd;
    const fInt = vBaseInt * ALIQUOTA_FUNDOS;
    const iInt = vBaseInt * ISS_FATOR;
    const subTotalInt = vBaseInt + fInt + iInt;
    const dadosProt = buscarProtMECancelamento(valorTitulo);
    const vBaseCan = dadosProt.valor;
    const fCan = vBaseCan * ALIQUOTA_FUNDOS;
    const iCan = vBaseCan * ISS_FATOR;
    const subTotalCan = vBaseCan + fCan + iCan;
    const vBaseAve = 55.67;
    const fAve = vBaseAve * ALIQUOTA_FUNDOS;
    const iAve = vBaseAve * ISS_FATOR;
    const subTotalAve = vBaseAve + fAve + iAve;
    const totalGeral = vJudiciario + subTotalInt + subTotalCan + subTotalAve + taxaCorreio;
    const containerResumo = document.getElementById('resumoMECancel');

    if (valorTitulo > 0) {
        containerResumo.innerHTML = `
            <i class="fa-solid fa-building" style="font-size: 30px; color: var(--primary); margin-bottom: 15px; display: block;"></i>
            <div class="detalhe-calculo"><strong>Apontamento (ID 3196):</strong><br><span>R$ ${vJudiciario.toFixed(2)}</span></div>
            <div class="detalhe-calculo"><strong>Intimação (ID 3209):</strong><br><small>${vBaseInt.toFixed(2)} + ${fInt.toFixed(2)} + ${iInt.toFixed(2)}</small><small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><span>Total: R$ ${subTotalInt.toFixed(2)}</span></div>
            <div class="detalhe-calculo"><strong>Cancelamento (ID ${dadosProt.id}):</strong><br><small>${vBaseCan.toFixed(2)} + ${fCan.toFixed(2)} + ${iCan.toFixed(2)}</small><small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><span>Total: R$ ${subTotalCan.toFixed(2)}</span></div>
            <div class="detalhe-calculo averbacao-box"><strong>Averbação de Baixa (ID 3210):</strong><br><small>${vBaseAve.toFixed(2)} + ${fAve.toFixed(2)} + ${iAve.toFixed(2)}</small><small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><span>Total: R$ ${subTotalAve.toFixed(2)}</span></div>`;
    } else {
        containerResumo.innerHTML = `<i class="fa-solid fa-building" style="font-size: 40px; color: #eee; display: block; margin-bottom: 10px;"></i><p class="placeholder-text">Preencha o valor para calcular Cancelamento ME.</p>`;
    }
    document.getElementById('totalGeralMECancel').innerText = totalGeral.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calcularMELiquidacao() {
    const valorTitulo = parseFloat(document.getElementById('valorTituloMELiq').value) || 0;
    const qtd = parseInt(document.getElementById('qtdMELiq').value) || 1;
    const issPerc = parseFloat(document.getElementById('issMELiq').value) || 5;
    const taxaCorreio = parseFloat(document.getElementById('taxaCorreioMELiq').value) || 0;
    const ALIQUOTA_FUNDOS = 0.2425;
    const vJud = 0;
    const vBaseInt = 7.43 * qtd;
    const fInt = vBaseInt * ALIQUOTA_FUNDOS;
    const iInt = vBaseInt * (issPerc / 100);
    const subInt = vBaseInt + fInt + iInt;
    const dados = buscarEmolumentoProtesto(valorTitulo);
    const idME = dados.id === "---" ? "---" : parseInt(dados.id) + 66;
    const fProt = dados.valor * ALIQUOTA_FUNDOS;
    const iProt = dados.valor * (issPerc / 100);
    const subProt = dados.valor + fProt + iProt;
    const total = vJud + subInt + subProt + taxaCorreio;

    document.getElementById('resumoMELiq').innerHTML = `
        <i class="fa-solid fa-building" style="font-size: 30px; color: var(--primary); margin-bottom: 15px; display: block;"></i>
        <div class="detalhe-calculo"><strong>Apontamento (ID 3146):</strong> R$ ${vJud.toFixed(2)}</div>
        <div class="detalhe-calculo"><strong>Intimação (ID 3159):</strong><br><small>${vBaseInt.toFixed(2)} + ${fInt.toFixed(2)} + ${iInt.toFixed(2)}</small><small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><span>Total: R$ ${subInt.toFixed(2)}</span></div>
        <div class="detalhe-calculo protesto-destaque"><strong>Liquidação (ID ${idME}):</strong><br><small>${dados.valor.toFixed(2)} + ${fProt.toFixed(2)} + ${iProt.toFixed(2)}</small><small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><span>Total: R$ ${subProt.toFixed(2)}</span></div>`;
    document.getElementById('totalGeralMELiq').innerText = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calcularCertidao() {
    const buscaSelo = (id) => TABELA_DADOS.find(item => item.id === id) || { v26: 0, jud: 0 };
    const idPrincipal = parseInt(document.getElementById('tipoCertidaoMenu').value);
    const qtdExtra = parseInt(document.getElementById('qtdAdicionalCert').value) || 0;
    const issPerc = parseFloat(document.getElementById('issCertidao').value) || 5;
    const ALIQUOTA_FUNDOS = 0.2425;
    const ISS_FATOR = issPerc / 100;
    const label = document.getElementById('labelAdicional');
    label.innerText = (idPrincipal === 3109) ? "Páginas Adicionais (ID 3110)" : "Nomes Adicionais (ID 3096)";
    const seloBase = buscaSelo(idPrincipal);
    const vBase = seloBase.v26;
    const fBase = vBase * ALIQUOTA_FUNDOS;
    const iBase = vBase * ISS_FATOR;
    const subTotalBase = vBase + fBase + iBase + (seloBase.jud || 0);
    const idExtra = (idPrincipal === 3109) ? 3110 : 3096;
    const seloExtra = buscaSelo(idExtra);
    const vBaseExtra = seloExtra.v26 * qtdExtra;
    const fExtra = vBaseExtra * ALIQUOTA_FUNDOS;
    const iExtra = vBaseExtra * ISS_FATOR;
    const subTotalExtra = vBaseExtra + fExtra + iExtra;
    const totalGeral = subTotalBase + subTotalExtra;

    document.getElementById('resumoCertidao').innerHTML = `
        <i class="fa-solid fa-file-signature" style="font-size: 30px; color: var(--primary); margin-bottom: 15px; display: block;"></i>
        <div class="detalhe-calculo"><strong>Base (ID ${idPrincipal}):</strong><br><small>${vBase.toFixed(2)} + ${fBase.toFixed(2)} + ${iBase.toFixed(2)} ${seloBase.jud > 0 ? '+ ' + seloBase.jud.toFixed(2) + ' (Jud)' : ''}</small><small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><span>Total: R$ ${subTotalBase.toFixed(2)}</span></div>
        ${qtdExtra > 0 ? `<div class="detalhe-calculo"><strong>Adicional (ID ${idExtra} x${qtdExtra}):</strong><br><small>${vBaseExtra.toFixed(2)} + ${fExtra.toFixed(2)} + ${iExtra.toFixed(2)}</small><small style="color: #bbb; font-size: 10px; font-weight: bold; display: block;">(Emol. + Fund. + ISS)</small><span>Total: R$ ${subTotalExtra.toFixed(2)}</span></div>` : ''}`;
    document.getElementById('totalGeralCertidao').innerText = totalGeral.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

// ==========================================
// 5. HISTÓRICO E UTILITÁRIOS
// ==========================================

function salvarHistorico() {
    let sufixo = "";
    let tipoOrcamento = "Liquidação/Desistência";
    let idResumo = "resumoSelos";
    let idTotal = "totalGeral";

    if (document.getElementById('page-cancelamento').style.display === 'block') { sufixo = "Cancel"; tipoOrcamento = "Cancelamento"; idResumo = "resumoCancelamento"; idTotal = "totalGeralCancel"; }
    else if (document.getElementById('page-me-liquidacao').style.display === 'block') { sufixo = "MELiq"; tipoOrcamento = "ME - Liquidação"; idResumo = "resumoMELiq"; idTotal = "totalGeralMELiq"; }
    else if (document.getElementById('page-me-cancelamento').style.display === 'block') { sufixo = "MECancel"; tipoOrcamento = "ME - Cancelamento"; idResumo = "resumoMECancel"; idTotal = "totalGeralMECancel"; }
    else if (document.getElementById('page-certidoes').style.display === 'block') {
        tipoOrcamento = "Certidão de Protesto"; idResumo = "resumoCertidao"; idTotal = "totalGeralCertidao";
        const devedor = document.getElementById('nomeCertidao').value || "---";
        const novoOrcamento = { data: new Date().toLocaleString('pt-BR'), tipo: tipoOrcamento, credor: "---", devedor: devedor, valorTitulo: "0.00", total: document.getElementById(idTotal).innerText, detalhes: document.getElementById(idResumo).innerHTML };
        let historico = JSON.parse(localStorage.getItem('protesto_historico') || '[]');
        historico.push(novoOrcamento);
        localStorage.setItem('protesto_historico', JSON.stringify(historico));
        alert('Orçamento salvo!'); renderHistorico(); return;
    }

    const credor = (document.getElementById('credor' + sufixo) || {}).value || "---";
    const devedor = (document.getElementById('devedor' + sufixo) || {}).value || "---";
    const valorTitulo = (document.getElementById('valorTitulo' + sufixo) || {}).value || "0.00";
    const total = document.getElementById(idTotal).innerText;
    const detalhamento = document.getElementById(idResumo).innerHTML;

    const novoOrcamento = { data: new Date().toLocaleString('pt-BR'), tipo: tipoOrcamento, credor: credor, devedor: devedor, valorTitulo: valorTitulo, total: total, detalhes: detalhamento };
    let historico = JSON.parse(localStorage.getItem('protesto_historico') || '[]');
    historico.push(novoOrcamento);
    localStorage.setItem('protesto_historico', JSON.stringify(historico));
    alert('Orçamento salvo no histórico!'); renderHistorico();
}

function renderHistorico() {
    const lista = document.getElementById('listaHistorico');
    if (!lista) return;
    let historico = JSON.parse(localStorage.getItem('protesto_historico') || '[]');

    lista.innerHTML = historico.map((o, index) => {
        return `
        <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="font-size: 0.9em; color: var(--text-light); text-align: center;">${o.data}</td>
            <td>
                <strong style="color: var(--primary);">${o.devedor}</strong><br>
                <small style="color: var(--text-light);">Credor: ${o.credor}</small>
            </td>
            <td style="text-align: center;">
                R$ ${parseFloat(o.valorTitulo).toFixed(2).replace('.', ',')}
            </td>
            <td style="text-align: center;">
                <strong style="color: #27ae60; font-size: 1.1em;">${o.total}</strong>
            </td>
            <td>
                <div style="display: flex; gap: 5px; justify-content: center;">
                    <button class="btn-print" title="Imprimir" onclick="imprimirOrcamento(${index})">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    <button class="btn-clear" title="Excluir" onclick="excluirOrcamento(${index})" style="background: var(--danger);">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    }).reverse().join('');
}

// ADICIONADO: Função para imprimir que o histórico estava chamando
function imprimirOrcamento(index) {
    let historico = JSON.parse(localStorage.getItem('protesto_historico') || '[]');
    const o = historico[index];
    const printWindow = window.open('', '', 'height=800,width=900');

    // Brasão da República URL (Wikimedia Commons)
    const brasaoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Coat_of_arms_of_Brazil.svg/300px-Coat_of_arms_of_Brazil.svg.png";

    printWindow.document.write('<html><head><title>Imprimir Orçamento</title>');
    printWindow.document.write(`
        <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 40px; color: #333; }
            .header-print { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .header-print img { width: 90px; margin-bottom: 10px; }
            .header-print h2 { margin: 5px 0; font-size: 18px; text-transform: uppercase; }
            .header-print p { margin: 2px 0; font-size: 12px; color: #555; }
            
            .info-orcamento { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #ddd; }
            .info-orcamento p { margin: 5px 0; font-size: 14px; }
            
            .detalhe-calculo { border-bottom: 1px solid #eee; padding: 10px 0; font-size: 13px; }
            .detalhe-calculo strong { color: #0056b3; }
            .detalhe-calculo span { float: right; font-weight: bold; color: #333; }
            .detalhe-calculo small { display: block; color: #666; font-size: 11px; margin-top: 2px; }
            
            .total-section { text-align: right; margin-top: 30px; font-size: 24px; color: #2ecc71; font-weight: bold; border-top: 2px solid #333; padding-top: 10px; }
            
            @media print {
                body { padding: 0; }
                .no-print { display: none; }
            }
        </style>
    `);
    printWindow.document.write('</head><body>');

    // Cabeçalho com Brasão e Dados do Cartório
    printWindow.document.write(`
        <div class="header-print">
            <img src="${brasaoUrl}" alt="Brasão da República">
            <h2 style="font-size: 16px; margin-bottom: 5px;">Tabelionato de Notas, Protesto de Títulos,<br>Tabelionato e Oficialato de Registro de Contratos Marítimos</h2>
            <p style="font-weight: bold; font-size: 14px; margin-top: 5px;">Marilia de Abreu Oliveira - Tabeliã</p>
            <p>Avenida Niquelândia, Qd. 02, Lt.20 - Jardim Bela Vista, CEP 72.975-000</p>
            <p><strong>Cocalzinho de Goiás - GO</strong></p>
            <p>Fone: (62) 3339-1479 | E-mail: notaseprotestoscocalzinho@hotmail.com</p>
        </div>
    `);

    // Dados do Orçamento
    printWindow.document.write(`
        <div class="info-orcamento">
            <h3 style="margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${o.tipo}</h3>
            <p><strong>Devedor:</strong> ${o.devedor}</p>
            <p><strong>Credor:</strong> ${o.credor}</p>
            <p><strong>Data do Orçamento:</strong> ${o.data}</p>
            ${parseFloat(o.valorTitulo) > 0 ? `<p><strong>Valor do Título:</strong> R$ ${parseFloat(o.valorTitulo).toFixed(2).replace('.', ',')}</p>` : ''}
        </div>
    `);

    printWindow.document.write('<div style="margin-bottom: 20px;"><strong>Detalhamento das Custas:</strong></div>');
    printWindow.document.write(o.detalhes); // O HTML dos detalhes já vem formatado, o CSS acima ajusta a exibição

    printWindow.document.write(`<div class="total-section">Total: ${o.total}</div>`);

    printWindow.document.write(`
        <div style="margin-top: 50px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
            Orçamento gerado pelo Sistema Protesto 2026 - Válido para conferência simples.
        </div>
    `);

    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Pequeno delay para garantir carregamento da imagem antes de imprimir
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

function excluirOrcamento(index) {
    if (confirm("Excluir histórico?")) {
        let historico = JSON.parse(localStorage.getItem('protesto_historico') || '[]');
        historico.splice(index, 1);
        localStorage.setItem('protesto_historico', JSON.stringify(historico));
        renderHistorico();
    }
}

function limparFormulario() {
    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'number') input.value = (input.id.includes('iss') ? 5 : (input.id.includes('qtd') || input.id.includes('Adicional') ? 1 : ''));
        else input.value = '';
    });
    ['totalGeral', 'totalGeralCancel', 'totalGeralMELiq', 'totalGeralMECancel', 'totalGeralCertidao'].forEach(id => {
        const el = document.getElementById(id); if (el) el.innerText = 'R$ 0,00';
    });
    const resumos = [
        { id: 'resumoSelos', icon: 'fa-file-invoice-dollar', msg: 'Preencha o valor do título para ver os selos.' },
        { id: 'resumoCancelamento', icon: 'fa-ban', msg: 'Preencha o valor para calcular o cancelamento (Diferido).' },
        { id: 'resumoMELiq', icon: 'fa-building', msg: 'Preencha o valor para calcular Liquidação ME.' },
        { id: 'resumoMECancel', icon: 'fa-building-circle-xmark', msg: 'Preencha o valor para calcular Cancelamento ME.' },
        { id: 'resumoCertidao', icon: 'fa-file-signature', msg: 'Altere os campos para calcular os valores.' }
    ];
    resumos.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) el.innerHTML = `<i class="fa-solid ${item.icon}" style="font-size: 40px; color: #eee; display: block; margin-bottom: 10px;"></i><p class="placeholder-text">${item.msg}</p>`;
    });
}

// ==========================================
// CONTROLE DE ACESSO (LOGIN / LOGOUT)
// ==========================================

function verificarLogin() {
    const senhaCorreta = "123456";
    const senhaDigitada = document.getElementById('loginPassword').value;
    const erroMsg = document.getElementById('loginError');

    if (senhaDigitada === senhaCorreta) {
        sessionStorage.setItem('logado', 'true');
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'flex';
        showPage('home');
    } else {
        if (erroMsg) erroMsg.style.display = 'block';
        document.getElementById('loginPassword').value = '';
    }
}

function fazerLogout() {
    if (confirm("Deseja realmente sair do sistema?")) {
        sessionStorage.clear();
        document.querySelector('.wrapper').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
        const inputSenha = document.getElementById('loginPassword');
        if (inputSenha) {
            inputSenha.value = '';
            inputSenha.focus();
        }
        const erroMsg = document.getElementById('loginError');
        if (erroMsg) erroMsg.style.display = 'none';
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        if (themeText) themeText.innerText = "Modo Escuro";
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (themeText) themeText.innerText = "Modo Claro";
        localStorage.setItem('theme', 'dark');
    }
}

const carregarTema = () => {
    const salvo = localStorage.getItem('theme');
    if (salvo === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (themeText) themeText.innerText = "Modo Claro";
    }
}

// INICIALIZAÇÃO DO SISTEMA
window.onload = function () {
    carregarTema();
    const isLogado = sessionStorage.getItem('logado') === 'true';

    if (isLogado) {
        document.getElementById('login-screen').style.display = 'none';
        document.querySelector('.wrapper').style.display = 'flex';
        showPage('home');
    } else {
        document.getElementById('login-screen').style.display = 'flex';
        document.querySelector('.wrapper').style.display = 'none';
    }
    if (!verificarValidadeLicenca()) return; // Trava o sistema se expirado
    carregarTema();
    renderHistorico();
};