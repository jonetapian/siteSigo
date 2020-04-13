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
    
    this.atualizarCarrinho();


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

  deletar(produto){
    let deletarProduto: Produto[] = [];

    deletarProduto = JSON.parse(localStorage.getItem("carrinho")) || [];
    deletarProduto.splice(produto, 1);

    console.log("produto" + deletarProduto);

    localStorage.setItem("carrinho", JSON.stringify(deletarProduto));
    this.listaProdutos.splice(produto, 1);
  }

  atualizarCarrinho(){
    this.produtos = JSON.parse(localStorage.getItem("carrinho"));

    for(let i = 0; i < this.produtos.length; i++){

      this.produtos[i].quantidadeCarrinho = 1;
      this.precoTotal += this.produtos[i].preco * 1;

      this.listaProdutos.push(this.produtos[i]);
    }
  }
}
