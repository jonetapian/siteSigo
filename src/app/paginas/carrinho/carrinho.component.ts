import { ProdutosService } from './../../produtos/service/produtos.service';
import { Observable } from 'rxjs';
import { Produto } from './../../produtos/model/produtoModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  produtos: Observable<any>;
  contador: Produto;
  
  constructor(private produtosService: ProdutosService) { }

  ngOnInit() {
    this.produtos = this.produtosService.buscarCarrinho();
    
  }

  

}
