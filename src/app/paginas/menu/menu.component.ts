import { Produto } from './../../produtos/model/produtoModel';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { ProdutosDataService } from './../../produtos/service/produtos-data.service';
import { BuyCardComponent } from './../../shared/buy-card/buy-card.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  produtos:Array<Produto> = new Array<Produto>();
  constructor(private produto_service:ProdutosService) { }

  ngOnInit() {
    this.produto_service.buscar().subscribe((res:Array<Produto>) => {
      console.log(res);
      this.getRightItems(res);
    });
  }
  getRightItems(array){
    for(let item of array){
      if(item.foto){
        this.produtos.push(item);
      }
    }
    console.log(this.produtos)
  }

}
