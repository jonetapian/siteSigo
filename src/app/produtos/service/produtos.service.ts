import { Produto } from './../model/produtoModel';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  adicionar(produtos: Produto){
    return this.db.list('produtos').push(produtos)
      .then((result: any) => {
        console.log(result.key);
        return new Produto(result);
      });
  }

  alterar(produtos: Produto, key: string){
    this.db.list('produtos').update(key, produtos)
    .catch((error: any) => {
      console.error(error);
    });
  }

  buscarPorid(produto_key){
    return this.db.database.ref('/produtos/' + produto_key).once('value').then(function(snapshot) {
      let product = new Produto(snapshot.val());
      product.key = snapshot.key;
      return product;
      // ...
    });
  }
  buscar(){
    return this.db.list('produtos')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const key = c.payload.key;
            const val = c.payload.val();
            let product = new Produto(val);
            product.key = key
            return product
          });
        })
      );
  }

  deletar(key: string){
    this.db.object(`produtos/${key}`).remove();
  }

  adicionarFoto(files: string, produtos: Produto){
    this.db.list('fotos/' + produtos.nome).push(files)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  deletarFoto(url, key: string, produtos: Produto){
    return this.storage.storage.refFromURL(url).delete(),
    this.db.object('fotos/' + produtos.nome + `${key}`).remove();
  }

  adicionarCarrinho(produto){
    this.db.list('carrinho/').push(produto)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  salvarCarrinho(produto){
    this.db.list('usuarios/').push(produto)
      .then((result: any) => {
        
      })
  }

}
