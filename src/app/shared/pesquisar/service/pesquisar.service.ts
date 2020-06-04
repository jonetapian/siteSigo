import { Produto } from './../../../produtos/model/produtoModel';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class PesquisarService {

  constructor(private db: AngularFireDatabase) { }

  getProdutos(start: string){
    /*return this.db.list('produtos/', {
      query: {
        orderByChild: 'nome',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    })*/
    /*return this.db.list('/produtos/').query.orderByChild('nome').once('value').then(function(snapshot) {
      console.log(snapshot.val());
      let produto = new Produto(snapshot.val());
      return produto
    });*/
    console.log("d")
    return this.db.list('/produtos/', ref => ref.orderByChild('nome'))
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => {
          const val = c.payload.val();
          console.log(c.payload.val())
          let produto = new Produto(val);
          return produto
        });
      })
    );
  }
}
