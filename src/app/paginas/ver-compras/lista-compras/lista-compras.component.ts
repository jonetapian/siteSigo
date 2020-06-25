import { Transacao } from './../model/transacao';
import { Frete } from './../../finalizar-compra/models/frete-model';
import { CompraFinalizada } from './../model/compra_finalizada';
import { Vendedor } from './../../finalizar-compra/models/vendedor-model';
import { VendedorService } from './../../finalizar-compra/services/vendedor.service';
import { Compra } from './../../finalizar-compra/models/compra-model';
import { ComprasService } from './../services/compras/compras.service';
import { Component, OnInit } from '@angular/core';
import {faMoneyCheckAlt, faHandshake, faTruckMoving, faHome} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  constructor(
    private compras_service:ComprasService,
    private vendedor_service:VendedorService,
    ) { }
  compras:Array<Compra> = new Array<Compra>();
  vendedor:Vendedor = new Vendedor();
  aguardando_pagamento = faMoneyCheckAlt;
  pago = faHandshake;
  em_entrega = faTruckMoving;
  entregue = faHome;
  transacoes:Array<Transacao> = new Array<Transacao>();
  compras_finalizas: Array<CompraFinalizada> = new Array<CompraFinalizada>();
  show_ratreio_alert:boolean = false;
  ngOnInit() {
    this.pegarVendedor();
    this.BuscarCompras();
  }
  BuscarCompras(){
    this.compras_service.buscar().subscribe(res =>{
      console.log(res);
      this.compras = res;
      this.BuscarTransacoes();
    });
  }
  BuscarTransacoes(){
    for(let compra of this.compras){
      this.compras_service.buscarTransaçãoPorCodigo(compra.codigo_transacao, this.vendedor.email,this.vendedor.pag_token).subscribe(res =>{
        let xml2js = require('xml2js');
        let parser = new xml2js.Parser({explicitArray : false} );
        parser.parseStringPromise(res).then(result => {
          console.log(result)
          let transacao =new Transacao(result.transaction);
          this.transacoes.push(transacao);
          this.compras_finalizas.push( new CompraFinalizada({compra : compra, transacao: transacao}));
          console.log(this.compras_finalizas);
        });
      });
    }
  }
  pegarVendedor(){
    this.vendedor_service.buscar().subscribe(res =>{
      this.vendedor = res[0];
    });
  }
  GetEnderecoComoString(frete:Frete){
    return frete.rua + ", " + frete.numero + ", - " + frete.bairro + ", "  + frete.cidade + "-" + frete.estado + ", " + frete.cep;
  }
  GetTipoPeloNumero(tipo){
    switch (tipo) {
      case 1:
        return "Cartão de crédito";
      case 2:
        return "Boleto";
      case 3:
        return "Débito Online";

    }
  }

  GetPortugueseStatus(status, compra:Compra){
    switch (status) {
      case '1':
        return "Aguardando pagamento";
      case '2':
        return "Em análise";
      case '3':
        if(!compra.rastreio){
          this.show_ratreio_alert = true;
        }
        return "Paga";
      case '4':
        if(!compra.rastreio){
          this.show_ratreio_alert = true;
          return "Pago";

        }else{
          return "A caminho"
        }
      case '5':
        return "Em disputa";
      case '6':
        return "Devolvida";
      case '7':
        return "Cancelada";
    }
  }
}
