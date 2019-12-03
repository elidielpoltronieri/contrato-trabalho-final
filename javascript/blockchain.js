var enderecoContrato = "0xbc6573af5627d0d0ff317379b93131176ffe2da0";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);
