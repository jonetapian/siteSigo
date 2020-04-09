import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DestaquesService {

  constructor(private db:AngularFireDatabase) { }

  createDestaques(destaques){
    return this.db.object('destaques/').set(destaques);
  }
  getDestaques(){
    return this.db.database.ref('destaques/'
    ).once('value').then(function(snapshot) {
      return snapshot.val();
      // ...
    });

  }
  deleteDestaques(){
    return this.db.object('destaques/').remove();
  }
}
