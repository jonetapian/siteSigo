export class Parcela {
  valor:number;
  valor_total:number;
  sem_juros:boolean;
  quantidade:number;
  constructor(data?){
    if(data){
      this.fromJson(data);
    }
  }
  fromJson(data){
    this.valor = data.valor;
    this.valor_total = data.valor_total;
    this.sem_juros = data.sem_juros;
    this.quantidade = data.quantidade;
  }
}
