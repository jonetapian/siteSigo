import { PromocoesService } from './../promocoes/service/promocoes.service';
import { Produto } from './../../produtos/model/produtoModel';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { ProdutosDataService } from './../../produtos/service/produtos-data.service';
import { BuyCardComponent } from './../../shared/buy-card/buy-card.component';
import { Component, OnInit } from '@angular/core';
import { Promocao } from '../promocoes/model/promocoes_model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  produtos:Array<Produto> = new Array<Produto>();
  produtos_promocao:Array<Produto> = new Array<Produto>();
  promocoes:Array<Promocao> = new Array<Promocao>();
  constructor(private produto_service:ProdutosService,private promotion_service:PromocoesService) { }

  ngOnInit() {
    this.produto_service.buscar().subscribe((res:Array<Produto>) => {
      console.log(res);
      this.produtos = res;
      this.getPromotedProducts();

    });
  }
  getPromotedProducts(){
    this.promotion_service.getAllPromotions().then(promotions =>{
      this.promocoes = promotions;
      console.log(promotions);

      for(let check of this.promocoes["Dia dos homens"].produtos){
        for(let produto of this.produtos){
          if(produto.key == check){
            this.produtos_promocao.push(produto);
          }
        }

      }
      console.log(this.produtos_promocao);
    });
  }
  corrousel_photos = [
    '../assets/imgs/model_1.jpg',
    '../assets/imgs/model_2.jpg',
    '../assets/imgs/model_3.jpg'
  ]


}
