export class Usuario {
  email:string;
  uid:string;
  nome:string;
  manager:boolean;
  constructor(private data?:any){
    if(data){
      this.fromJson(data);
    }

  }
  fromJson(data){
    this.email = data.email;
    this.uid = data.uid;
    this.nome = data.nome;
    if(data.manager){
      this.manager = data.manager;
    }
  }
}
