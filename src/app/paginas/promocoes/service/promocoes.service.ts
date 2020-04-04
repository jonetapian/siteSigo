import { map } from 'rxjs/operators';
import { Promocao } from './../model/promocoes_model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PromocoesService {

  constructor(private db:AngularFireDatabase) { }
  createPromotion(promocao:Promocao){
    return this.db.object('promocoes/'+ promocao.nome ).set(promocao);
  }
  deletePromotion(promocao:Promocao){
    this.db.object('promocoes/' + promocao.nome).remove();
  }
  updatePromotion(promocao:Promocao){
    this.db.object('promocoes/' + promocao.nome).set(promocao);
  }
  getPromotion(promocao:Promocao){
     return this.db.database.ref('promocoes/'+ promocao.nome
     ).once('value').then(function(snapshot) {
       return snapshot.val();
       // ...
     });
  }
  getAllPromotions(){
    return this.db.list('promocoes')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
}
