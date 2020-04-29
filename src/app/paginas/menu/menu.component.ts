import { DestaquesService } from './../destaques/service/destaques.service';
import { Produto } from 'src/app/produtos/model/produtoModel';
import { PromocoesService } from './../promocoes/service/promocoes.service';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { ProdutosDataService } from './../../produtos/service/produtos-data.service';
import { BuyCardComponent } from './../../shared/buy-card/buy-card.component';
import { Component, OnInit } from '@angular/core';
import { Promocao } from '../promocoes/model/promocoes_model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {
  produtos:Array<Produto> = new Array<Produto>();
  produtos_promocao:Produto[][] = [[],[]];
  promocoes:Array<Promocao> = new Array<Promocao>();
  destaques:Array<string> = new Array<string>();
  produtos_em_destaque:Array<Produto> = new Array<Produto>();

  constructor(private produto_service:ProdutosService,private promotion_service:PromocoesService,private destaque_service:DestaquesService) { }

  ngOnInit() {
    this.produto_service.buscar().subscribe((res:any) => {
      console.log(res);
      this.produtos = res;
      this.getPromotedProducts();
      this.destaque_service.getDestaques().then((res:any) =>{
        this.destaques = res;
        if(res){
          this.getDestaqueProducts();

        }

      });


    });

  }
  getDestaqueProducts(){
    for(let item of this.destaques){
      console.log(item);
      for(let produto of this.produtos){
        console.log(produto.key)
        if(produto.key){
          if(item === produto.key){
            console.log(produto.key)
            this.produtos_em_destaque.push(produto);
          }
        }

      }
    }
  }
  getPromotedProducts(){
    this.promotion_service.getAllPromotions().subscribe((promotions:any) =>{
      this.promocoes = promotions;
      console.log(promotions);

      let counter =0;
      for(let promocao of this.promocoes){
        for(let product_key of promocao.produtos){
          for(let produto of this.produtos){
            if(produto.key == product_key){
              this.produtos_promocao[counter].push(produto);
            }
          }
        }
        counter +=1;
      }
      console.log(this.produtos_promocao);
    });
  }
  getProductBykey(key){
    for(let produto of this.produtos){
      if(key == produto.key){
        return produto;
      }
    }
  }
  corrousel_photos = [
    '../assets/imgs/model_1.jpg',
    '../assets/imgs/model_2.jpg',
    '../assets/imgs/model_3.jpg'
  ]


}
