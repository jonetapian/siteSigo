import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firebaseAuth:AngularFireAuth) { }

  Login(email,senha){
    return this.firebaseAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL).then(() => {
      return this.firebaseAuth.auth.signInWithEmailAndPassword(email,senha).then(val =>{
        return val;
        console.log(val);
      }).catch(error => {return error});
    }).catch(error => {return error})

  }

}
