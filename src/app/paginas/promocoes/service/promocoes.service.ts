import { Produto } from 'src/app/produtos/model/produtoModel';
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
  adicionarPromocao(key:string, valorPorcentagem){
    this.db.list(`produtos/${key}`).set("promocao",true)
    .catch((error: any) => {
      console.error(error);
    });
    this.db.list(`produtos/${key}`).set("valorPorcentagem", valorPorcentagem)
    .catch((error: any) => {
      console.error(error);
    });
  }
  removerPromocao(key:string){
    this.db.list(`produtos/${key}`).set("promocao",false)
    .catch((error: any) => {
      console.error(error);
    });
    this.db.list(`produtos/${key}`).set("valorPorcentagem", 0)
    .catch((error: any) => {
      console.error(error);
    });
  }
  
}
