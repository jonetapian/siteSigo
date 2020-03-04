import { Produtos } from './../model/produtoModel';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  adicionar(produtos: Produtos){
    this.db.list('produtos').push(produtos)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  alterar(produtos: Produtos, key: string){
    this.db.list('produtos').update(key, produtos)
    .catch((error: any) => {
      console.error(error);
    });
  }
     

  buscar(){
    return this.db.list('produtos')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  deletar(key: string){
    this.db.object(`produtos/${key}`).remove();
  }

  adicionarFoto(files: string, produtos: Produtos){
    this.db.list('fotos/' + produtos.nome).push(files)
      .then((result: any) => {
        console.log(result.key);
      });
  }
  
  deletarFoto(url, key: string, produtos: Produtos){
    return this.storage.storage.refFromURL(url).delete(),
    this.db.object('fotos/' + produtos.nome + `${key}`).remove();
  }
}
