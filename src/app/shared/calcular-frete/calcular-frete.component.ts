import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calcular-frete',
  templateUrl: './calcular-frete.component.html',
  styleUrls: ['./calcular-frete.component.css']
})
export class CalcularFreteComponent implements OnInit {

  constructor( private http: HttpClient) { }

  @Output() enviarFrete = new EventEmitter();

  nCdEmpresa = "";
  sDsSenha = "";
  nCdServico = "04510";
  cepOrigem = "08226022";
  cepDestino = "";
  nVlPeso = "2";
  nCdFormato = "1";
  nVlComprimento = "20";
  nVlAltura = "20";
  nVlLargura = "20";
  nVlDiametro = "90";
  sCdMaoPropria = "S";
  nVlValorDeclarado = "100";
  sCdAvisoRecebimento = "N";

  corsHeaders;
  frete;

  ngOnInit() {

    

  
  }

  calcularFrete(cepDestino){
    console.log(cepDestino);
    this.http.get(`https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=${this.nCdEmpresa}&sDsSenha=${this.sDsSenha}&nCdServico=${this.nCdServico}&sCepOrigem=${this.cepOrigem}&sCepDestino=${cepDestino}&nVlPeso=${this.nVlPeso}&nCdFormato=${this.nCdFormato}&nVlComprimento=${this.nVlComprimento}&nVlAltura=${this.nVlAltura}&nVlLargura=${this.nVlLargura}&nVlDiametro=${this.nVlDiametro}&sCdMaoPropria=${this.sCdMaoPropria}&nVlValorDeclarado=${this.nVlValorDeclarado}&sCdAvisoRecebimento=${this.sCdAvisoRecebimento}`, { responseType: 'text' }).subscribe(dados => {
      console.log(dados);
      this.converterXml(dados);
    }, err => {
      console.log(err);
    });

  }

  converterXml(xml){
    let parseString = require('xml2js').parseString;
    let prazo;
    let precoFrete;
    
    parseString(xml, function (err, result) {
      prazo = result.cResultado.Servicos[0].cServico[0].PrazoEntrega[0];
      precoFrete = result.cResultado.Servicos[0].cServico[0];
      console.dir(result);
      
    });

    this.frete = prazo;
    this.enviarFrete.emit(precoFrete);
  }

  pegarConversao(){
    
  }
}
