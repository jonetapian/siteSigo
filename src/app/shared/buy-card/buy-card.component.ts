import { Produto } from './../../produtos/model/produtoModel';
import { Component, OnInit, Input } from '@angular/core';
import { Promocao } from 'src/app/paginas/promocoes/model/promocoes_model';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.css']
})
export class BuyCardComponent implements OnInit {

  @Input() produto:Produto;
  @Input() promocao:Promocao;
  buy_icon = faCartPlus;
  constructor() { }

  ngOnInit() {
    console.log(this.promocao);
  }
  getDiscount(){
    return (parseInt(this.produto.preco) - (parseInt(this.produto.preco) * parseInt(this.promocao.valor_porcentagem)  / 100)).toFixed(2);
  }
}
