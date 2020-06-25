import { Frete } from './../finalizar-compra/models/frete-model';
import { Vendedor } from './../finalizar-compra/models/vendedor-model';
import { Transacao } from './../ver-compras/model/transacao';
import { VendedorService } from './../finalizar-compra/services/vendedor.service';
import { CompraFinalizada } from './../ver-compras/model/compra_finalizada';
import { Compra } from './../finalizar-compra/models/compra-model';
import { ComprasService } from './../ver-compras/services/compras/compras.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rastreio',
  templateUrl: './rastreio.component.html',
  styleUrls: ['./rastreio.component.css']
})
export class RastreioComponent implements OnInit {

  compras: Compra[];
  vendedor: Vendedor;
  transacoes: Array<Transacao> = new Array<Transacao>();
  comprasFinalizadas: Array<CompraFinalizada> = new Array<CompraFinalizada>();

  constructor(private comprasService: ComprasService, private vendedorService: VendedorService) { }

  ngOnInit() {

    this.pegarVendedor();
    this.buscarCompras();
  }

  buscarCompras(){
    this.comprasService.buscarTodasCompras().subscribe(res => {
      console.log(res);
      this.transacoes = [];
      this.compras = [];
      this.comprasFinalizadas = [];
      this.compras = res;

      this.buscarTransacoes();
    });
  }

  buscarTransacoes(){
    for(let compra of this.compras){
      this.comprasService.buscarTransaçãoPorCodigo(compra.codigo_transacao, this.vendedor.email,this.vendedor.pag_token).subscribe(res =>{
        let xml2js = require('xml2js');
        let parser = new xml2js.Parser({explicitArray : false} );
        parser.parseStringPromise(res).then(result => {
          console.log(result)
          let transacao =new Transacao(result.transaction);
          this.transacoes.push(transacao);
          this.comprasFinalizadas.push( new CompraFinalizada({compra : compra, transacao: transacao}));
          console.log(this.comprasFinalizadas);
        });
      });
    }
  }

  pegarVendedor(){
    this.vendedorService.buscar().subscribe(res =>{
      this.vendedor = res[0];
    });
  }

  getEnderecoComoString(frete:Frete){
    return frete.rua + ", " + frete.numero + ", - " + frete.bairro + ", "  + frete.cidade + "-" + frete.estado + ", " + frete.cep;
  }
  getTipoPeloNumero(tipo){
    switch (tipo) {
      case 1:
        return "Cartão de crédito";
      case 2:
        return "Boleto";
      case 3:
        return "Débito Online";

    }
  }

  getPortugueseStatus(status){
    switch (status) {
      case '1':
        return "Aguardando pagamento";
      case '2':
        return "Em análise";
      case '3':
        return "Paga";
      case '4':
        return "Disponível";
      case '5':
        return "Em disputa";
      case '6':
        return "Devolvida";
      case '7':
        return "Cancelada";
    }
  }

  onMostrarCampo(addCodigo){
    console.log(addCodigo)
    addCodigo.hidden = !addCodigo.hidden;
  }

  onAddCodigo(rastreio, compra){
    this.comprasService.adicionarCodigo(rastreio, compra);
  }

}
