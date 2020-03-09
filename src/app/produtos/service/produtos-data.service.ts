import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../model/produtoModel';

@Injectable({
  providedIn: 'root'
})
export class ProdutosDataService {
  private produtosSource = new BehaviorSubject({ produtos: null, key: '' });
  currentProdutos = this.produtosSource.asObservable();

  constructor() { }

  changeContato(produtos: Produto, key: string) {
    this.produtosSource.next({ produtos: produtos, key: key });
  }
}
