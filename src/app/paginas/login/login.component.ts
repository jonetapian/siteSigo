import { ConfiguracoesService } from './../configuracoes/service/configuracoes.service';
import { FormAlertComponent } from './../../shared/form-alert/form-alert.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../usuario/usuario.service';
import { LoginService } from './service/login.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/model/usuarioModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private usuario_service:UsuarioService, private router:Router, private configuracoesService: ConfiguracoesService, private route: ActivatedRoute) { }
  email:string = '';
  senha:string = '';
  showAlert:boolean;
  AlertText:string;
  emailSenha: string = "";
  parametro;
  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    console.log(this.parametro);
  }
  Logar(){
    if(this.email.length > 0 && this.senha.length >0 ){
      this.loginService.Login(this.email,this.senha).catch(error => {
        this.OrganizaErro(error);
        console.log(error);
      }).then((val:any) =>{
        this.OrganizaErro(val);
        this.usuario_service.PegarUsuarioProUid(val.user.uid).then(val => {
          let usuario = new Usuario(val);
          this.usuario_service.ArmazenarLocal(usuario);
          if(this.parametro == "carrinho"){
            this.router.navigate(['carrinho']);
          }else{
            this.router.navigate(['/']);
          }
        }).catch(error => this.OrganizaErro(error));
      });
    }else{
      this.createAlert('Preencha todos os campos e tente novamente');
    }
  }
  OrganizaErro(error){
    switch (error.code) {
      case 'auth/wrong-password':
          this.createAlert('Ops Senha incorreta, por favor tente novamente');
        return;
      case 'auth/user-not-found':
          this.createAlert('Ops Usuario não encontrado, por favor tente novamente');
        return;
      case 'auth/invalid-email':
        this.createAlert('Ops Email inválido, por favor tente novamente');
        return;
    }
  }
  createAlert(text){
    this.AlertText = text;
    this.showAlert = true;
  }

  reenviarSenha(email){
    this.configuracoesService.resetSenha(email);
  }
}
