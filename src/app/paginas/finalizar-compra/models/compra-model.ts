import { Usuario } from 'src/app/usuario/model/usuarioModel';
import { Comprador } from './comprador-model';
import { SizedProduct } from './../../../produtos/model/sizedProduct';

import { Frete } from './frete-model';
export class Compra {
  frete: Frete = new Frete();
  comprador:Comprador;
  produtos:Array<SizedProduct> = new Array();
  codigo_transacao:string;
  ref:string;
  usuario_uid:string = '';
  rastreio = '';
  key:string;
  constructor(data?){
    if(data){
      this.fromJson(data);
    }
  }

  fromJson(data){
    this.frete = data.frete;
    this.comprador = data.comprador;
    this.produtos = data.produtos;
    this.codigo_transacao = data.codigo_transacao;
    this.ref = data.ref;
    this.usuario_uid = data.usuario_uid;
    this.rastreio = data.rastreio;
  }
}
