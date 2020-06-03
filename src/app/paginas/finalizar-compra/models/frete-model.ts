import { Produto } from 'src/app/produtos/model/produtoModel';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
export class Frete {
  cep:number = 0;
  rua:string;
  cidade:string;
  estado:string;
  bairro:string;
  complemento:string = '';
  numero:number = 0;

  constructor(data?){
    if(data){
      this.fromJson(data);
    }
  }
  fromJson(data){
    this.cep = data.cep;
    this.rua = data.rua;
    this.cidade = data.cidade;
    this.estado = data.estado;
    this.bairro = data.bairro;
    this.complemento = data.complemento;
    this.numero = data.numero;
  }
}
