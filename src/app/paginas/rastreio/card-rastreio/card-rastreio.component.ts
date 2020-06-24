import { Compra } from './../../finalizar-compra/models/compra-model';
import { Produto } from './../../../produtos/model/produtoModel';
import { Frete } from './../../finalizar-compra/models/frete-model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-rastreio',
  templateUrl: './card-rastreio.component.html',
  styleUrls: ['./card-rastreio.component.css']
})
export class CardRastreioComponent implements OnInit {

  @Input() comprasFinalizadas;
  
  compras: Compra[];

  constructor() { }

  ngOnInit() {
    
  }

  

}
