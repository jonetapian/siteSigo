import { Usuario } from './model/usuarioModel';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private authService:AngularFireAuth, private database:AngularFireDatabase) {
    this.UsuarioLogado();
   }
   usuarioAtual:Usuario;

   UsuarioLogado(){
     console.log(JSON.parse(localStorage.getItem("usuario")));
    return new Usuario(JSON.parse(localStorage.getItem("usuario")));

  }
  ArmazenarLocal(usuario:any){
    localStorage.setItem("usuario",JSON.stringify(usuario));
    console.log("armazenou")
  }
  DeletarLocal(){
    localStorage.removeItem("usuario");
  }

  CriarUsuario(usuario:Usuario){
    this.database.object('usuarios/'+usuario.uid).set(usuario);
  }
  RemoverUsuario(usuario:Usuario){
    this.database.object('usuarios/'+usuario.uid).remove();
  }
  PegarUsuarioProUid(uid){
    return this.database.database.ref('/usuarios/' + uid).once('value').then(function(snapshot) {
      return snapshot.val();
      // ...
    });
  }

}
