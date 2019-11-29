var enderecoContrato = "0x8a3Bf641809CDEc7FaD2ad8501969E3cFEebEEf6";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);

function registrarStatusLance() {
    var textoCampo = document.frmStatus.txtStatusLance.value;
    var caixaStatusTx = document.getElementById("caixaStatusTx");
    if (textoCampo.length === 8) {
        caixaStatusTx.innerHTML = "Enviando transação...";
        contrato.mudaStatusLance(textoCampo)
        .then( (transacao) => {
            console.log("registrarMudancaStatus - Transacao ", transacao);   
            caixaStatusTx.innerHTML = "Transação enviada. Aguardando processamento...";
            transacao.wait()
            .then( (resultado) => {
                buscaStatusContrato();
                caixaStatusTx.innerHTML = "Transação realizada.";
            })        
            .catch( (err) => {
                console.error("registrarMudancaStatus - Aguardando tx ser minerada");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            })
        })
        .catch( (err) => {
            console.error("registrarMudancaStatus");
            console.error(err);
            caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
        })
    }
}

function buscaStatusContrato() {
    var status;
    var campoStatus = document.getElementById("campoStatus");     
    contrato.statusLance()
    .then( (resultado) => {
        campoStatus.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoStatus.innerHTML = err;
    });

function encerrarLeilao() {
    var textoEncerrar = document.getElementById("frmEncerrar");
    textoEncerrar.innerHTML = "Conectando para encerramento do Leilão...";
        contrato.fimDoLeilao()
        .then( (transacao) => {
            console.log("encerrarLeilao - Transacao ", transacao);   
            textoEncerrar.innerHTML = "encerrando o leilão..."
            transacao.wait()
            .then( (resultado) => {
                buscaFimContrato();
                textoEncerrar.innerHTML = "Leilão Encerrado";
            })        
            .catch( (err) => {
                console.error("encerrarLeilao - Aguardando tx ser minerada");
                console.error(err);
                textoEncerrar.innerHTML = "Erro ao se conectar minerar";
            })
        })
        .catch( (err) => {
            console.error("encerrarLeilao - Aguardando tx ser minerada");
            console.error(err);
            textoEncerrar.innerHTML = "Erro ao se conectar minerar";
        })
    }
}

}
