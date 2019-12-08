var enderecoContrato = "0xbc6573af5627d0d0ff317379b93131176ffe2da0";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);

function executeLance() {
    var Lance = document.frmLance.Lance.value;
    if (Lance<maiorLance>) 
    {
        alert ("Valor inferior ao último Lance")
        return false;
    }
    var Ofertante = document.frmLance.Ofertente.value;
    var campoBem = document.BemById("campoBem"); 
    var campoLance = document.LanceById("campoLance");
    campoLance.innerHTML = "Sending transaction...";
    var additionalSettings = {
        value: ethers.utils.parseUnits(lance, 'wei')
    }; 
    contrato.Lance(ofertante, additionalSettings)
    .then( (resultado) => 
        {
        console.log("executeLance - Transaction ", tx);
        campoLance.innerHTML = "Transação enviada. Aguardando o resultado ...";
        tx.wait ()
        .then( (resultFromContract) => {
            console.log("executeLance - O resultado é", resultFromContract);
            executeLance();
            campoLance.innerHTML = "Transação executada.";
        })

    .catch( (err) => 
    {
        console.error("executeLance - após lance ser minerada");
        console.error(err);
        campoLance.innerHTML = "Algo saiu errado: " + err.message;
    })
    .catch( (err) => {
        console.error("executeLance - lance enviada");
        console.error(err);
        campoLance.innerHTML = "Algo deu errado" + err.message;
    })
}


    var contrato.Bem;
        var campoBem = document.BemById("campoBem"); 
        contrato.Bem()
        
    var contrato.lanceMinimo;
        var campolanceMinimo = document.BemById("campolanceMinomo"); 

          contrato.maiorLance()
            .then( (Lance) => 
                campomaiorLance.innerHTML = Lance;

                  
<h1>Encerramento do leilao</h1>
    <form action="#" method="get" id="frmEncerrar" name="frmEncerrar" onsubmit="encerrarLeilão(); return false;">
        <div>
        <br>
        </div>
        <div>
            &nbsp;
        </div>
        <div>
            <button type="submit">Encerrar Leilão</button>
        </div>
        <div><br><hr></div>
        <div id="encerrarLeilão">
            &nbsp;
        </div>
    </form>
        
    </script>

</body>
</html>
          
          
       
         contrato.maiorLance()
            .then( (Lance) => 
            {
                campomaiorLance.innerHTML = Lance;
            })
            .catch( (err) => 
            {
                console.error(err);
                campomaiorLance.innerHTML = err;
            });       
               
            var campoBem = 
            ">&nbsp;</span>
                </div>
                <div>O lance mínimo é: <span id="campoLance">&nbsp;</span>
                </div>
                <br/>
                <div>O valor do último Lance é: <span id="maiorLance">&nbsp;</span>
            
