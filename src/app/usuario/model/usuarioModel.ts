export class Usuario {
  email:string;
  uid:string;
  nome:string;
  manager:boolean = false;
  created_at :Date;
  constructor(data?:any){
    if(data){
      this.fromJson(data);
    }

  }
  fromJson(data){
    this.email = data.email;
    this.uid = data.uid;
    this.nome = data.nome;
    this.created_at = data.created_at
    if(data.manager){
      this.manager = data.manager;
    }
  }
}
