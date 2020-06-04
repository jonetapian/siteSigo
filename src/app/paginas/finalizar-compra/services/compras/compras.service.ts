import { map } from 'rxjs/operators';
import { UsuarioService } from './../../../../usuario/usuario.service';
import { Usuario } from 'src/app/usuario/model/usuarioModel';
import { Compra } from './../../models/compra-model';
import { Produto } from 'src/app/produtos/model/produtoModel';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  usuario_logado:Usuario;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private usuario_service:UsuarioService) {
    this.usuario_logado = usuario_service.UsuarioLogado();
   }

  adicionar(compra:Compra){
    return this.db.list("usuarios/" +this.usuario_logado.uid +'/compras').push(compra)
      .then((result: any) => {
        console.log(result.key);
        return new Produto(result);
      });
  }
  buscar(){
    return this.db.list("usuarios/" +this.usuario_logado.uid +'compras')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            return c.payload.val()
          });
        })
      );
  }
}
