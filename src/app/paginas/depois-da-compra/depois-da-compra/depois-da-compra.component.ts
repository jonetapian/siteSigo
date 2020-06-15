import { UsuarioService } from './../../../usuario/usuario.service';
import { Usuario } from 'src/app/usuario/model/usuarioModel';
import { Frete } from './../../finalizar-compra/models/frete-model';
import { Comprador } from './../../finalizar-compra/models/comprador-model';
import { Compra } from './../../finalizar-compra/models/compra-model';
import { Transacao } from './../../ver-compras/model/transacao';
import { Vendedor } from './../../finalizar-compra/models/vendedor-model';
import { VendedorService } from './../../finalizar-compra/services/vendedor.service';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from './../../ver-compras/services/compras/compras.service';
import { PagSeguroService } from './../../finalizar-compra/services/pag-seguro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depois-da-compra',
  templateUrl: './depois-da-compra.component.html',
  styleUrls: ['./depois-da-compra.component.css']
})
export class DepoisDaCompraComponent implements OnInit {

  constructor(private pag_service:PagSeguroService,
    private compra_service:ComprasService,
     private activate_route:ActivatedRoute,
     private vendedor_service:VendedorService,
     private usuario_service:UsuarioService) {
       this.usuario = this.usuario_service.UsuarioLogado();
      }
  id_transacao:number;
  vendedor:Vendedor;
  transacao:Transacao = new Transacao();
  compra = new Compra();
  usuario:Usuario;
  ngOnInit() {
    this.activate_route.queryParams.subscribe(res =>{
      console.log(res);
      this.id_transacao = res.id;
    });
    this.vendedor_service.buscar().subscribe(res =>{
      this.vendedor = res[0];
      this.GetDadosTransacao();
    });
  }

  GetDadosTransacao(){
    this.compra_service.buscarTransaçãoPorCodigo(this.id_transacao, this.vendedor.email, this.vendedor.pag_token).subscribe(res =>{
      console.log(res);
      let xml2js = require('xml2js');
      let parser = new xml2js.Parser({explicitArray : false});
      parser.parseStringPromise(res).then(result => {
        console.log(result)

        let comprador = new Comprador();
        comprador.email = result.transaction.sender.email;
        comprador.cpf = result.transaction.sender.documents.document.value;
        comprador.nome = result.transaction.sender.name;
        comprador.telefone = result.transaction.sender.phone.areaCode + result.transaction.sender.phone.number;

        let endereco = new Frete();

        endereco.cep = result.transaction.shipping.address.postalCode;
        endereco.cidade = result.transaction.shipping.address.city;
        endereco.bairro = result.transaction.shipping.address.district;
        endereco.estado = result.transaction.shipping.address.state;
        endereco.numero =  result.transaction.shipping.address.number;
        endereco.rua = result.transaction.shipping.address.street;
        endereco.complemento = result.transaction.shipping.address.complement;
        this.compra.codigo_transacao = String(this.id_transacao);
        this.compra.comprador = comprador;
        this.compra.frete = endereco;
        this.compra.ref = result.transaction.reference;
        this.GetProdutosNoStorage();
        console.log(this.compra);
         this.transacao = new Transacao(result.transaction);
      });
    });
  }

  GetProdutosNoStorage(){
    let produtos = JSON.parse(localStorage.getItem("carrinho"));
    this.compra.produtos = produtos;
    this.SalvarCompra();
    console.log(this.compra);
  }

  SalvarCompra(){
    this.compra.usuario_uid = this.usuario.uid;
    this.compra_service.adicionar(this.compra).then(res =>{
    });
  }

}
