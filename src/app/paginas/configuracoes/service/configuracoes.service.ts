import { Usuario } from './../../../usuario/model/usuarioModel';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  constructor(private authService: AngularFireAuth, private db: AngularFireDatabase) { }

  atualizarEmail(usuario: Usuario, key){
    this.authService.auth.currentUser.updateEmail(usuario.email).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });

    this.db.list('usuarios').update(key, {"email": usuario.email})
      .catch(error => {
        console.error(error);
      })
  }

  atualizarNome(usuario: Usuario, key){

    this.db.list('usuarios').update(key, {"nome": usuario.nome}).then(res => {
      console.log(res);
    }).catch(error => {
        console.error(error);
      })
  }

  atualizarSenha(){
    
    
  }

  resetSenha(email: string){
    this.authService.auth.sendPasswordResetEmail(email).then(res => {
      alert("Um e-mail lhe foi enviado para criar oura senha");
    });
  }

}
