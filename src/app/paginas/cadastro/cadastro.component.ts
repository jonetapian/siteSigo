import { Router } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';
import { CadastroService } from './service/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { error } from 'util';

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
  ngOnInit() {
    console.log(this.usuario.UsuarioLogado());
  }
  login(){
    if(this.email.length != 0 && this.senha.length != 0 && this.nome.length != 0 ){
      console.log(this.email + this.senha)
      let user_data = {
        email: this.email,
        senha: this.senha,
        nome: this.nome
      }
      this.cadastro.CreateAuth(user_data).catch(error => {
        if(error){
          this.showAlert = true;
        }

      }).then(val => this.route.navigate(['']));
    }else{
      this.showAlert = true;
    }
  }

}
