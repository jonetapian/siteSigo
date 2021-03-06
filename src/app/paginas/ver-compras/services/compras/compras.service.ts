import { Compra } from './../../../finalizar-compra/models/compra-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../../../../usuario/usuario.service';
import { Usuario } from 'src/app/usuario/model/usuarioModel';
import { Produto } from 'src/app/produtos/model/produtoModel';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  usuario_logado:Usuario;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private usuario_service:UsuarioService, private http_service:HttpClient) {
    this.usuario_logado = usuario_service.UsuarioLogado();
   }

  adicionar(compra:Compra){
    return this.db.list('compras').push(compra)
      .then((result: any) => {
        return new Compra(result);
      });
  }
  buscar(){
    return this.db.list('compras', ref => ref.orderByChild("usuario_uid").equalTo(this.usuario_logado.uid))
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => {
          const key = c.payload.key;
          const val = c.payload.val();
          let compra = new Compra(val);
          compra.key = key;

          return compra;
        });
      })
    );


  }
  buscarTransaçãoPorCodigo(code, email,token){
    const headers = new HttpHeaders().append('Content-type','application/x-www-form-urlencoded ;charset=UTF-8');
    return this.http_service.get(environment.cors + environment.sandbox.transaction + code +"?email=" + email + "&token=" + token, {headers: headers, responseType: 'text'}).pipe(
      map(val => {
        return val;
      })

    );

  }

  buscarTodasCompras(){
    return this.db.list('compras')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => {
          const key = c.payload.key;
          const val = c.payload.val();

          let compra = new Compra(val);
          compra.key = key;
          return compra;
        });
      })
    );
  }

  adicionarCodigo(rastreio, compra: Compra){
    let db = this.db
    compra.rastreio = rastreio;
    console.log(compra)
    this.db.list('compras').update(compra.key, compra).then(res =>{
      console.log(res)
    })
    .catch((error: any) => {
      console.error(error);
    });

    /*this.db.list(`compras/`, ref => ref.orderByChild('codigo_transacao').equalTo(compra.codigo_transacao))
    .snapshotChanges()
    .pipe(
      map(changes => {
         changes.map(c => {
          console.log(i);
          this.db.list(`compras/${c.key}/produtos/${i}`).set("rastreio", rastreio);
        });
      })
    )*/
  }
}
