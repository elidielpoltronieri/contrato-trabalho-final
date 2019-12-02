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
    
    address payable public ContaLeiloeiro;
    uint public DataEncerramento;

    address public maiorOfertante;
    uint public maiorLance;

    mapping(address => Ofertante) listaOfertantes;
    Ofertante[] public ofertantes;

    bool public encerrado;

    event novoMaiorLance(address ofertante, uint valor);
    event fimDoLeilao(address arrematante, uint valor);

    modifier somenteLeiroeiro 
    {
        require(msg.sender == ContaLeiloeiro, "Somente o Leiloeiro pode realizar essa operacao");
        _;
    }

    constructor
    ( address payable _ContaLeiroeiro,
        uint _duracaoLeilao
    ) public 
    {
        ContaLeiloeiro = _ContaLeiroeiro;
        // DataEncerramento: para um mes: 2629743; para um dia: 86400; para uma semana: 604800; para um min.: 60
        DataEncerramento = now + _duracaoLeilao;
    }

    function lance(string memory nomeOfertante, address payable enderecoCarteiraOfertante) public payable 
    {
        require(now <= DataEncerramento, "Leilao encerrado.");
        require(msg.value > maiorLance, "Ja foi apresentado lance maior.");
        
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

   
    function finalizaLeilao() public
    {
        require(now <= DataEncerramento, "Leilao encerrado"); 
        
        encerrado = true;
        
        require(now >= DataEncerramento, "Leilao ainda nao encerrado.");
        
        emit fimDoLeilao (maiorOfertante, maiorLance);

        ContaLeiloeiro.transfer(address(this).balance);
    }
}


//* function finalizaLeilao() public view returns(uint);
    {
        return string.DataEncerramento;
        require(now >= DataEncerramento, "Leilao ainda nao encerrado.");
        encerrado = true;
    
        emit fimDoLeilao (maiorOfertante, maiorLance);

        ContaLeiloeiro.transfer(address(this).balance);
    }
