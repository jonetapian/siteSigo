export class Produto{
    nome = '';
    tipo:Array<string> = new Array<string>();
    marca: string;
    tamanho:Array<string> = new Array<string>();
    cor:Array<string> = new Array<string>();
    preco: number = 0;
    categoria = '';
    foto:Array<string> = new Array<string>();
    key ='';
    quantidadeCarrinho = 1;

    constructor(json?){
      if(json){
        this.fromJson(json);
      }
    }

    fromJson(val){
      this.nome = val.nome;
      this.tipo = val.tipo;
      this.marca = val.marca;
      this.tamanho = val.tamanho;
      this.cor = val.cor;
      this.preco = val.preco;
      this.categoria = val.categoria;
      this.foto = val.foto;
      this.key = val.key;
      this.quantidadeCarrinho = val.quantidade;
    }
}
