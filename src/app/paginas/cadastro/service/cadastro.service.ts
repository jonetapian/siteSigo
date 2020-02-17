import { UsuarioService } from './../../../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { FirebaseDatabase, FirebaseAuth, AngularFireModule } from '@angular/fire';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'url';
import { Usuario } from 'src/app/usuario/model/usuarioModel';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private firebaseService: AngularFireAuth) { }
  CreateAuth(userData){
    return this.firebaseService.auth.createUserWithEmailAndPassword(userData.email,userData.senha).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);

      return error;
      // ...
    }).then((val:any) => {return val});
  }
  DestroyAuth(){
     return this.firebaseService.auth.signOut().then(val => {return val}).catch(error => console.log(error));
  }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.firebaseService.auth
      .signInWithPopup(provider)
      .then((res:any) => {
        console.log(res)
        if(res.user){
          let user = new Usuario (res.user);
          user.nome = res.user.displayName;
          resolve(user);
        }else{
          resolve(res);
        }

      });
    });
  }
}
