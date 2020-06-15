import { Usuario } from './model/usuarioModel';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private authService:AngularFireAuth, private database:AngularFireDatabase) {
    this.UsuarioLogado();
   }
   usuarioAtual:Usuario;

   UsuarioLogado(){
    return new Usuario(JSON.parse(localStorage.getItem("usuario")));

  }
  ArmazenarLocal(usuario:any){
    localStorage.setItem("usuario",JSON.stringify(usuario));
  }
  DeletarLocal(){
    localStorage.removeItem("usuario");
  }

  CriarUsuario(usuario:Usuario){
    this.database.object(environment.database.usuario+ usuario.uid).set(usuario);
  }
  RemoverUsuario(usuario:Usuario){
    this.database.object(environment.database.usuario+usuario.uid).remove();
  }
  PegarUsuarioProUid(uid){
    return this.database.database.ref(environment.database.usuario + uid).once('value').then(function(snapshot) {
      return snapshot.val();
      // ...
    });
  }

}
