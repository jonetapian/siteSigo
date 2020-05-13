import { SizedProduct } from './../../../produtos/model/sizedProduct';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Produto } from './../../../produtos/model/produtoModel';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carrinho-card',
  templateUrl: './carrinho-card.component.html',
  styleUrls: ['./carrinho-card.component.css']
})
export class CarrinhoCardComponent implements OnInit {
  @Input() produto:SizedProduct;
  @Input() show_size_alert:boolean;
  @Output() decrese = new EventEmitter();
  @Output() increse = new EventEmitter();
  @Output() update_in_local = new EventEmitter();
  @Output() remove = new EventEmitter();
  delete_icon = faTimesCircle;

  constructor() { }

  ngOnInit() {
    console.log(this.produto)
  }
  emitDecrese(){
    this.decrese.emit(this.produto)
  }
  emitIncrise(){
    this.increse.emit(this.produto);
  }
  isSizedProduct(){
    if(this.produto.selected_size){
      return true;
    }else{
      return false;
    }
  }
  removeProduct(){
    this.remove.emit();
  }
  emitUpdate(){
    this.update_in_local.emit();
    this.show_size_alert = false;
  }

}
