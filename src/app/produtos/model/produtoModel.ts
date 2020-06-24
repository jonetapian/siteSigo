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
    timestamp:number;
    quantidadeCarrinho = 1;
    time = 0;
    promocao = false;
    valorPorcentagem = 0;
    rastreio = '';

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
      val.quantidadeCarrinho ? this.quantidadeCarrinho = val.quantidadeCarrinho : null;
      this.time = val.time;
      this.promocao = val.promocao;
      this.valorPorcentagem = val.valorPorcentagem;
      this.rastreio = val.rastreio;
    }

    static GetValorComPromocao(produto:Produto){
      if(produto.promocao){
        return produto.preco - ((produto.preco * produto.valorPorcentagem )/ 100)
      }else{
        return produto.preco;
      }
    }
}
