import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Vendedor } from './../models/vendedor-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private db: AngularFireDatabase) { }
  adicionar(vendedor:Vendedor){
    return this.db.list('vendedor').push(vendedor)
      .then((result: any) => {
        console.log(result.key);
        return new Vendedor(result);
      });
  }
  buscar(){
    return this.db.list('vendedor')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const key = c.payload.key;
            const val = c.payload.val();
            let vendedor = new Vendedor(val);
            return vendedor;
          });
        })
      );
  }

}
