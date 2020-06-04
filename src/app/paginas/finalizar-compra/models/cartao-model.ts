export class Cartao {
  numero:number;
  bin:number;
  nome_marca:string;
  tamanho_cvv:number;
  nome:string;
  cpf:number;
  cvv:string;
  mes_validade:string;
  ano_validade:string;
  aniversario:string;
  token:string = "";
  telefone:number;
  constructor(data?){
    if(data){
      this.FromJson(data);
    }
  }
  FromJson(data){
    this.numero = data.numero;
    this.bin = data.bin;
    this.nome_marca = data.nome_marca;
    this.tamanho_cvv = data.tamanho_cvv;
    this.nome = data.nome;
    this.cpf = data.cpf;
    this.cvv = data.cvv;
    this.mes_validade = data.mes_validade;
    this.ano_validade = data.ano_validade;
    this.token = data.token;
    this.aniversario = data.aniversario;
  }
}
