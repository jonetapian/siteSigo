import { Tag } from './../tags/model/tag_model';
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
  products: Array<Produto> = new Array<Produto>();
  showing_products:  Array<Produto> = new Array<Produto>();



  constructor(private produtosService: ProdutosService, private ProdutosDataService: ProdutosDataService) { }

  ngOnInit() {
    this.getProducts();
  }

  deletar(key: string){

  }
  getProducts(){
    this.produtosService.buscar().subscribe((res:any) =>{
      this.products = res;
      this.showing_products = res;
    });
  }

  filterSelected(tag){
    console.log(tag);
    this.getTagByFilter(tag);
  }
  filterRemoved(tag){

  }
  getTagByFilter(filter){
    console.log(filter);
    let filtered_array:any =[];
    for(let filtered_product of filter.produtos){
      for(let product of this.products){
        if(filtered_product === product.key){
          filtered_array.push(product);
        }
      }
    }
    this.showing_products = filtered_array;
  }

  adicionarCarrinho(produto){
    this.produtosService.adicionarCarrinho(produto);
  }


}
