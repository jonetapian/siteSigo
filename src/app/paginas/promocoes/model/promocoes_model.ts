export class Promocao{
  nome:string;
  descricao:string;
  valor_porcentagem:string;
  produtos:Array<string> = new Array();
  constructor(json?){
    json? this.fromJson(json):null;
  }
  fromJson(json){
    this.nome = json.nome;
    this.descricao = json.descricao;
    this.valor_porcentagem = json.valor_porcentagem;
    this.produtos = json.produtos;
  }
}
