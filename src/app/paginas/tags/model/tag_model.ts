export class Tag{
  tipo:string;
  nome:string;
  produtos:Array<any> = new Array();
  
  constructor(json?){
    json? this.fromJson(json):null;
  }
  fromJson(json){
    this.tipo = json.tipo;
    this.nome = json.nome;
    this.produtos = json.produtos;
    
  }
}
