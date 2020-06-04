export class Vendedor{
  cep_origem:string = '';
  email:string;
  pag_token:string;

  constructor(data?){
    if(data){
      this.fromJson(data);
    }
  }
  fromJson(data){
    this.cep_origem = data.cep_origem;
    this.email = data.email;
    this.pag_token = data.pag_token;
  }
}
