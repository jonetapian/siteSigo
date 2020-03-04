import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produtos } from '../model/produtoModel';

@Injectable({
  providedIn: 'root'
})
export class ProdutosDataService {
  private produtosSource = new BehaviorSubject({ produtos: null, key: '' });
  currentProdutos = this.produtosSource.asObservable();

  constructor() { }

  changeContato(produtos: Produtos, key: string) {
    this.produtosSource.next({ produtos: produtos, key: key });
  }
}