<?php
function calcula_frete($servico,$cep_origem,$cep_destino,$peso,$mao_propria,$valor_declarado,$aviso_recebimento){
 
 $mao_propria = (strtolower($mao_propria) == 's')?'s':'n';
 $aviso_recebimento = (strtolower($aviso_recebimento) == 's')?'s':'n';
  
 $url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem='. $cep_origem .'&sCepDestino='. $cep_destino .'&nVlPeso='. $peso .'&nCdFormato=1&nVlComprimento=20&nVlAltura=5&nVlLargura=15&sCdMaoPropria='. $mao_propria .'&nVlValorDeclarado='. $valor_declarado .'&sCdAvisoRecebimento='. $aviso_recebimento .'&nCdServico='. $servico .'&nVlDiametro=0&StrRetorno=xml';;
  
 $frete_calcula = simplexml_load_string(file_get_contents($url));
  
 $frete = $frete_calcula->cServico;
  
 if($frete->Erro == '0'){
  
     switch($frete->Codigo[0]){
         case '04510': 
             $servico = 'PAC'; 
             break;
         case '40045': 
             $servico = 'SEDEX a Cobrar'; 
             break;
         case '40215': 
             $servico = 'SEDEX 10'; 
             break;
         case '40290': 
             $servico = 'SEDEX Hoje'; 
             break;
         case '04014': 
             $servico = 'SEDEX'; 
             break;
     }
  
     $retorno = ['servico' => $servico, 'valor' => $frete->Valor, 'prazo' => $frete->PrazoEntrega];
  
 }elseif($frete->Erro == '7'){
     $retorno = ['erro' => 'Serviço temporariamente indisponível, tente novamente mais tarde.'];
     
 }else{
     $retorno = ['erro' => 'Erro no cálculo do frete, código de erro: '.$frete->Erro];
 }
  
 return $retorno;
  
 }
  
 $cep_origem = '97010000';
  
 //Posts
  
 $cep_destino = '97105030';
 $qtd = 1;
  
 $pesoItem = 0.15; //em kg
 if($qtd <= 1)
     $peso = 2 * $pesoItem;
 else 
     $peso = $qtd * $pesoItem;
  
 $tipo_codigo = '04510';
  
 $preco_declarado = 6000 * $qtd; //R$ 60,00 = 6000
 $resultado = calcula_frete($tipo_codigo,$cep_origem,$cep_destino,$peso,'n',0,'s');
  
 var_dump($resultado);

 ?>