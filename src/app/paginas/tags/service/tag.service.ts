import { map } from 'rxjs/operators';
import { Tag } from './../model/tag_model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Produto } from 'src/app/produtos/model/produtoModel';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private db:AngularFireDatabase) { }

  createTag(tag:Tag){
    return this.db.object('tags/'+ tag.tipo + "/" + tag.nome + "/dados da tag").set(tag);
  }
  deleteTag(tag:Tag){
    this.db.object('tags/'+ tag.tipo + "/" + tag.nome).remove();
  }
  updateTag(tag:Tag){
    this.db.object('tags/'+ tag.tipo + "/" + tag.nome).set(tag);
  }
  getTag(tag:Tag){
     return this.db.database.ref('tags/'+ tag.tipo + "/" + tag.nome + "/produtos"
     ).once('value').then(function(snapshot) {
       return snapshot.val();
       // ...
     });
  }
  getAllTags(){
    return this.db.database.ref('/tags').once('value').then(function(snapshot) {
      return snapshot.val();
      // ...
    });
  }
  createTaggedProduct(tag:Tag,produto_key:any){
    return this.db.object('tags/'+ tag.tipo + "/" + tag.nome + "/produtos/" + produto_key ).set(produto_key);
  }
}
