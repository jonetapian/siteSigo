import { ComprasService } from './services/compras/compras.service';
import { Vendedor } from './models/vendedor-model';
import { VendedorService } from './services/vendedor.service';
import { Parcela } from './models/parcela';
import { Cartao } from './models/cartao-model';
import { Comprador } from "./models/comprador-model";
import { Compra } from "./models/compra-model";
import { Frete } from "./models/frete-model";
import { PagSeguroService } from "./services/pag-seguro.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatHorizontalStepper } from '@angular/material/stepper';

declare var PagSeguroLightbox : any;
@Component({
  selector: "app-finalizar-compra",
  templateUrl: "./finalizar-compra.component.html",
  styleUrls: ["./finalizar-compra.component.css"],
})
export class FinalizarCompraComponent implements OnInit {
  @ViewChild('stepper', {read: false, static: false}) stepper:MatHorizontalStepper;
  frete: Frete = new Frete();
  comprador: Comprador = new Comprador();
  compra:Compra = new Compra();
  parcelas:Array<Parcela> = new Array<Parcela>();
  vendedor:Vendedor = new Vendedor();


  constructor(
    private pag_service: PagSeguroService,
    private vendedor_service:VendedorService,
    private compra_service:ComprasService
  ) {}

  ngOnInit() {
    this.pegarVendedor();
    this.compra.produtos = JSON.parse(localStorage.getItem("carrinho"));
  }

  converterXml(xml) {
    let parseString = require("xml2js").parseString;
    let resposta;
    parseString(xml, function (err, result) {
      resposta = result;
    });
  }

  pegarVendedor(){
    this.vendedor_service.buscar().subscribe(res =>{
      this.vendedor = res[0];
    });
  }
  AbrirLightBox(){
    this.compra.comprador = this.comprador;
    this.compra.frete = this.frete;

    this.pag_service.GetAuthToken(this.vendedor.email,this.vendedor.pag_token,this.compra,this.vendedor).subscribe(res =>{
      let xml2js = require('xml2js');
      let parser = new xml2js.Parser(/* options */);
      parser.parseStringPromise(res).then(result => {
      console.dir(result);
      console.log('Done');
      let code = result.checkout.code[0];
      let date = result.checkout.date[0];

      let callback = {
          success : (transactionCode) => {
            this.compra.codigo_transacao = transactionCode;
            this.compra_service.adicionar(this.compra).then(res =>{

            });
              //Insira os comandos para quando o usuário finalizar o pagamento.
              //O código da transação estará na variável "transactionCode"
              console.log("Compra feita com sucesso, código de transação: " + transactionCode);
          },
          abort : function() {
              //Insira os comandos para quando o usuário abandonar a tela de pagamento.
              console.log("abortado");
          }
      };
      //Chamada do lightbox passando o código de checkout e os comandos para o callback
      var isOpenLightbox = PagSeguroLightbox(code, callback);
      // Redireciona o comprador, caso o navegador não tenha suporte ao Lightbox
      if (!isOpenLightbox){
          location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
      }
    });
  });
  }
  CompradorPronto(value){
    this.comprador = new Comprador(value);
    this.stepper.next();
  }
  EntregaPronto(value){
    this.frete = new Frete(value);
    this.stepper.next();
    console.log(this.frete)
  }
}
