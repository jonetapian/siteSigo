import { ErrorHandler } from './../../shared/error-handler/error_handler';
import { Router } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';
import { CadastroService } from './service/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { error } from 'util';
import { Usuario } from 'src/app/usuario/model/usuarioModel';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private cadastro:CadastroService, private usuario:UsuarioService, private route:Router) { }
  email:string = '';
  senha:string = '';
  nome:string = '';
  showAlert:boolean;
  AlertText:string;
  ngOnInit() {
  }
  login(){
    if(this.email.length != 0 && this.senha.length != 0 && this.nome.length != 0 ){
      let user_data = {
        email: this.email,
        senha: this.senha,
        nome: this.nome
      }
      this.cadastro.CreateAuth(user_data).catch(error => {
        if(error){
          this.createAlert(error);
        }
      }).then(val =>{
        if(val.user){
          let user = new Usuario(val.user);
          user.nome = this.nome;
          // user.email = val.user.email;
          // user.uid = val.user.uid;
          user.created_at = new Date();
          this.createAndStorageUser(user);
        }else{
          this.createAlert(val);
        }
      } );
      // }).then(val => this.organizaErro(val));
    }else{
      this.showAlert = true;
      this.AlertText = 'Preencha todos os campos';
    }
  }
  createAlert(error){
    this.showAlert = true;
    this.AlertText = ErrorHandler.organizaErro(error);
  }
  googleLogin(){
    this.cadastro.doGoogleLogin().then((user:Usuario) =>{
      if(user.uid){
        this.createAndStorageUser(user);
      }else{
        this.createAlert(user);
      }
    });
  }
  createAndStorageUser(user:Usuario){
    let new_user = new Usuario(user);
    this.usuario.CriarUsuario(new_user);
    this.usuario.ArmazenarLocal(new_user);
    this.route.navigate(['']);

  }


}
