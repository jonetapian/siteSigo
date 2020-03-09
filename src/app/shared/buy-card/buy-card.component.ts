import { Produto } from './../../produtos/model/produtoModel';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.css']
})
export class BuyCardComponent implements OnInit {

  @Input() produto:Produto;

  constructor() { }

  ngOnInit() {
    console.log(this.produto);
  }

}
