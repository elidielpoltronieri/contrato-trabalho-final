pragma solidity 0.5.12;

contract Leilao 
{
    struct Ofertante 
    {
        string nome;
        address payable enderecoCarteira;
        uint oferta;
        bool jaFoiReembolsado;
    }
    
    address payable public Conta Leiloeiro;
    uint public DataEncerramento;

    address public maiorOfertante;
    uint public maiorLance;

    mapping(address => Ofertante) public listaOfertantes;
    Ofertante[] public ofertante;

    bool public encerrado;

    event novoMaiorLance(address ofertante, uint valor);
    event fimDoLeilao(address arrematante, uint valor);

    modifier somenteLeiroeiro 
    {
        require(msg.sender == Conta Leiloeiro, "Somente o Leiloeiro pode realizar essa operacao");
        _;
    }

    constructor
    ( uint _duracaoLeilao,
        address payable _Conta Leiroeiro
    ) public 
    {
        contaLeiloeiro = _Conta Leiroeiro;
        prazoFinalLeilao = now + _duracaoLeilao;
    }


    function lance(string memory nomeOfertante, address payable enderecoCarteiraOfertante) public payable 
        {
        require(now <= DataEncerramento, "Leilao encerrado.");
        require(msg.value > maiorLance, "Ja foram apresentados lances maiores.");
        
        maiorOfertante = msg.sender;
        maiorLance = msg.value;
        
        for (uint i=0; i<ofertantes.length; i++) 
        {
            Ofertante storage ofertantePerdedor = ofertantes[i];
            if (!ofertantePerdedor.jaFoiReembolsado) 
            {
                ofertantePerdedor.enderecoCarteira.transfer(ofertantePerdedor.oferta);
                ofertantePerdedor.jaFoiReembolsado = true;
            }
        }
        
        Ofertante memory ofertanteVencedorTemporario = Ofertante(nomeOfertante, enderecoCarteiraOfertante, msg.value, false);
        
        ofertantes.push(ofertanteVencedorTemporario);
        
        listaOfertantes[ofertanteVencedorTemporario.enderecoCarteira] = ofertanteVencedorTemporario;
    
        emit novoMaiorLance (msg.sender, msg.value);
    }

   
    function finalizaLeilao() public somenteLeiroeiro {
       
        require(now >= DataEncerramento, "Leilao ainda nao encerrado.");
        require(!encerrado, "Leilao encerrado.");

        encerrado = true;
        emit fimDoLeilao(maiorOfertante, maiorLance);

        Conta Leiloeiro.transfer(address(this).balance);
    }
}
