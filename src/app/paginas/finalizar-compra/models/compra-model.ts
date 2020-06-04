import { Parcela } from './parcela';
import { Cartao } from './cartao-model';
import { Vendedor } from './vendedor-model';
import { Produto } from 'src/app/produtos/model/produtoModel';
import { Comprador } from './comprador-model';
import { Frete } from './frete-model';
export class Compra {
  frete: Frete;
  comprador:Comprador;
  produtos:Array<Produto>;
  codigo_transacao:string;
  constructor(data?){
    if(data){
      this.fromJson(data);
    }
  }

  fromJson(data){
    this.frete = data.frete;
    this.comprador = data.comprador;
    this.produtos = data.produtos;
    this.codigo_transacao = data.codigo_transacao
  }
}
