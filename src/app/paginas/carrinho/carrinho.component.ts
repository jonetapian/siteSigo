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

  produtos: Produto[];
  listaProdutos: Array<Produto> = [];
  contador = 1;
  produto: string;
  precoTotal: number = 0;
  
  constructor(private produtosService: ProdutosService) { }

  ngOnInit() {
    /*this.produtos = this.produtosService.buscarCarrinho();
    this.produtos.subscribe(prods =>{
      console.log(prods);
      prods.map(prod => {
        this.precoTotal += parseInt(prod.preco);
        console.log(this.precoTotal);
      });
    })
    console.log(this.produtos);*/
    this.produtos = JSON.parse(localStorage.getItem("carrinho"));
    for(let i = 0; i < this.produtos.length; i++){
      this.produtos[i].quantidadeCarrinho = 1;
      this.precoTotal += this.produtos[i].preco * 1;
      this.produtos[i].preco = this.produtos[i].preco;
      this.listaProdutos.push(this.produtos[i]);
    }

    
  }

  increment(produto: Produto){
    produto.quantidadeCarrinho++;
    this.precoTotal += produto.preco * 1;
  }

  decrement(produto: Produto){
    
    if(produto.quantidadeCarrinho < 1){
     
    }else{
      produto.quantidadeCarrinho--;
      this.precoTotal -= produto.preco * 1;
    }
  }

  limparCarrinho(){
    localStorage.clear();
  }

}
