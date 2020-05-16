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


  constructor(private produtosService: ProdutosService, private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
   }

  ngOnInit() {
    this.getProducts();
    this.produtosService.buscarPorTime().subscribe(val =>{
      console.log(val);
    });
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
    this.showing_products = this.products;
  }
  getTagByFilter(filter){
    console.log(filter);
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
