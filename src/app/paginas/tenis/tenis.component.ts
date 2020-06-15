import { Tag } from './../tags/model/tag_model';
import { TagService } from './../tags/service/tag.service';
import { Produto } from 'src/app/produtos/model/produtoModel';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ProdutosService } from 'src/app/produtos/service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-tenis',
  templateUrl: './tenis.component.html',
  styleUrls: ['./tenis.component.css']
})
export class TenisComponent implements OnInit {
  products:Array<Produto> = new Array<Produto>();
  showing_products:  Array<Produto> = new Array<Produto>();
  filter_side:boolean ;
  isSmallScreen:boolean;
  filter_icon = faFilter;
  tenis_product_keys:Array<string> = new Array<string>();


  constructor(private produtosService: ProdutosService, private breakpointObserver: BreakpointObserver,private tag_service:TagService) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
   }

  ngOnInit() {
    this.getTenisTag();
    this.produtosService.buscarPorTime().subscribe(val =>{
    });
  }

  deletar(key: string){

  }
  getTenisTag(){
    let tag = new Tag({nome:"Tênis", tipo:"tipo"})
    this.tag_service.getTag(tag).then(res =>{
      this.tenis_product_keys = res;
      this.getProducts();

    });
  }
  getProducts(){
    this.produtosService.buscar().subscribe((res:any) =>{
      res.forEach(element =>{
        for(let filtered_key of this.tenis_product_keys){
          if(element.key == filtered_key){
            this.products.push(element);
            this.showing_products.push(element);
          }
        }

      });
    });
  }

  filterSelected(tag){
    this.getTagByFilter(tag);
  }
  filterRemoved(tag){
    this.showing_products = this.products;
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
