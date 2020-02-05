import { LoginService } from './service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  email:string;
  senha:string;
  showAlert:boolean;
  ngOnInit() {
  }
  Logar(){
    if(this.email.length !==  0 && this.senha.length !==0){
      this.loginService.Login(this.email,this.senha);
    }else{
      this.showAlert = true;
    }
  }

}
