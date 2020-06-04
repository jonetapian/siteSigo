import { Produto } from 'src/app/produtos/model/produtoModel';
export class Comprador {
  nome:string;
  email:string;
  telefone:number;
  telefone_ddd:number;
  cpf:number;

  constructor(data?){
    if(data){
      this.fromJson(data);
    }
  }
  fromJson(data){
    this.nome = data.nome;
    this.email = data.email;
    this.telefone = data.telefone;
    this.cpf = data.cpf;
  }
}
