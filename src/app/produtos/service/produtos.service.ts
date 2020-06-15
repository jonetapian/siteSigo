import { Usuario } from 'src/app/usuario/model/usuarioModel';
import { Produto } from './../model/produtoModel';
import { Injectable } from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(public db: AngularFireDatabase, private storage: AngularFireStorage) { }

  adicionar(produtos: Produto){
    return this.db.list('produtos').push(produtos)
      .then((result: any) => {
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
    return this.db.database.ref(environment.database.produto + produto_key).once('value').then(function(snapshot) {
      let product = new Produto(snapshot.val());
      product.key = snapshot.key;
      return product;
      // ...
    });
  }
  buscarPorTime(){
    return this.db.list(environment.database.produto, ref => ref.orderByChild("time"))
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
  buscarRelacionados(produto: Produto){
    /*return this.db.list('/produtos/').query.orderByChild('tipo').once('value').then(function(snapshot) {
      console.log(snapshot.val());
      let produto = new Produto(snapshot.val());
      return produto
    });*/
    for(let i = 0; i < produto.tipo.length; i++){
      return this.db.list('/produtos', ref => ref.orderByChild("tipo").limitToFirst(10))
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

  deletar(produto: Produto){

    let db = this.db;
    this.db.object(environment.database.produto +`${produto.key}`).remove().then(result => {
      this.deletarCor(produto, db);
      this.deletarTamanho(produto, db);
      this.deletarMarca(produto, db);
      this.deletarTipo(produto, db);
    });

  }

  deletarFoto(url, key: string, produto: Produto){
    this.storage.storage.refFromURL(url).delete();
    let db = this.db;

    this.db.object(`produtos/${key}/foto/`).query.on('value',function(snapshot){
      let index = snapshot.val().indexOf(url);
      db.object(`produtos/${key}/foto/${index}`).remove();
    });

  }

  adicionarCarrinho(produto){
    this.db.list('carrinho/').push(produto)
      .then((result: any) => {
      });
  }

  salvarCarrinho(produto, usuario:Usuario){
    this.db.list('usuarios/' + usuario).push(produto)
      .then((result: any) => {

      })
  }

  deletarCor(produto: Produto, db){
    for(let i = 0; i < produto.cor.length; i++){
      this.db.object(`tags/cor/${produto.cor[i]}/produtos/`).query.on('value',function(snapshot){
        let index = snapshot.val().indexOf(produto.key);
        db.object(`tags/cor/${produto.cor[i]}/produtos/${index}`).remove();
      });
    }
  }
  deletarTamanho(produto: Produto, db){
    for(let i = 0; i < produto.tamanho.length; i++){
      this.db.object(`tags/tamanho/${produto.tamanho[i]}/produtos/`).query.on('value',function(snapshot){
        let index = snapshot.val().indexOf(produto.key);
        db.object(`tags/tamanho/${produto.tamanho[i]}/produtos/${index}`).remove();
      });
    }
  }
  deletarMarca(produto: Produto, db){

    this.db.object(`tags/marca/${produto.marca}/produtos/`).query.on('value',function(snapshot){
      let index = snapshot.val().indexOf(produto.key);
      db.object(`tags/marca/${produto.marca}/produtos/${index}`).remove();
    });

  }
  deletarTipo(produto: Produto, db){
    for(let i = 0; i < produto.tipo.length; i++){
      this.db.object(`tags/tipo/${produto.tipo[i]}/produtos/`).query.on('value',function(snapshot){
        let index = snapshot.val().indexOf(produto.key);
        db.object(`tags/tipo/${produto.tipo[i]}/produtos/${index}`).remove();
      });
    }
  }

}
