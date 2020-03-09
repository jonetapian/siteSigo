export class Tag{
  tipo:string;
  nome:string;
  constructor(json?){
    json? this.fromJson(json):null;
  }
  fromJson(json){
    this.tipo = json.tipo;
    this.nome = json.nome;
  }
}
