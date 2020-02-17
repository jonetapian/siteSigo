import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firebaseAuth:AngularFireAuth) { }

  Login(email,senha){
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email,senha).then(val =>{
      return val;
      console.log(val);
    }).catch(error => {return error});
  }

}
