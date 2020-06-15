export class Transacao{

  code:string;
  date:Date;
  valor_total:number;
  numero_de_parcelas:number;
  ultimo_evento:Date;
  metodo_pagamento = {
    codigo: 0,
    tipo: 0

  };
  status:number;
  tipo:number;
  constructor(data?){
    data? this.fromJson(data) : null;
  }
  fromJson(data){
    this.code = data.code;
    this.date = new Date(data.date);
    this.valor_total = data.grossAmount;
    this.numero_de_parcelas = data.installmentCount;
    this.ultimo_evento = new Date(data.lastEventDate);
    this.metodo_pagamento.codigo = Number(data.paymentMethod.code);
    this.metodo_pagamento.tipo = Number(data.paymentMethod.type);
    this.status = data.status;
    this.tipo = data.type;

  }
}
