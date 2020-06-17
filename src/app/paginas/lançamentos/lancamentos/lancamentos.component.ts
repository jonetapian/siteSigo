import { Tag } from './../../tags/model/tag_model';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Produto } from './../../../produtos/model/produtoModel';
import { ProdutosService } from './../../../produtos/service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {
  products:Array<Produto> = new Array<Produto>();
  showing_products:  Array<Produto> = new Array<Produto>();
  filter_side:boolean ;
  isSmallScreen:boolean;
  filter_icon = faFilter;

  all_filters:Array<Tag> = new Array<Tag>();


  constructor(private produtosService: ProdutosService, private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
   }

  ngOnInit() {
    this.getProducts();

  }

  deletar(key: string){

  }
  getProducts(){
    this.produtosService.buscarPorTime().subscribe((res:any) =>{
      this.products = res;
      this.showing_products = res;
    });
  }

  filterSelected(tag){
    this.getTagByFilter(tag);
    this.all_filters.push(tag);
  }
  filterRemoved(tag){
    this.showing_products = this.products;
    let tag_index = this.all_filters.indexOf(tag);
    if(tag_index !== -1){
      this.all_filters.splice(tag_index,1);
    }
    if(this.all_filters.length > 0){
      for(let old of this.all_filters){
        this.getTagByFilter(old);
      }
    }

  }
  getTagByFilter(filter){
    let filtered_array:any =[];
    for(let filtered_product of filter.produtos){
      for(let product of this.showing_products){
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
