export class Produto{
    nome = '';
    tipo:Array<string> = new Array<string>();
    marca: string;
    tamanho:Array<string> = new Array<string>();
    cor:Array<string> = new Array<string>();
    preco = '';
    categoria = '';
<<<<<<< HEAD
    foto:Array<string> = [];
}
=======
    foto = '';
    key ='';

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
    }
}
>>>>>>> 08b934070ba324b212c9517e3503ec2673e85198
