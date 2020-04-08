import { Produto } from './../../produtos/model/produtoModel';
import { ProdutosDataService } from './../../produtos/service/produtos-data.service';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-camisetas',
  templateUrl: './camisetas.component.html',
  styleUrls: ['./camisetas.component.css']
})
export class CamisetasComponent implements OnInit {
  produtos: Observable<any>;
  

  constructor(private produtosService: ProdutosService, private ProdutosDataService: ProdutosDataService) { }

  ngOnInit() {
    this.produtos = this.produtosService.buscar();
  }

  deletar(key: string){

  }

  adicionarCarrinho(produto){
    let addProduto: Produto[] = [];
    addProduto = JSON.parse(localStorage.getItem("carrinho")) || [];
    addProduto.push(produto);
    console.log(addProduto);
    localStorage.setItem("carrinho", JSON.stringify(addProduto));
  }
  
  
}
