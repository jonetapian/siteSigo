import { Transacao } from './transacao';
import { Compra } from './../../finalizar-compra/models/compra-model';
export class CompraFinalizada{
  compra:Compra = new Compra();
  transacao:Transacao;
  constructor(data?){
    data? this.fromJson(data) : null;
  }
  fromJson(data){
    this.compra = data.compra;
    this.transacao = data.transacao;
  }
}
