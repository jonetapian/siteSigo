import { Router } from '@angular/router';
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
  constructor(private route:Router) { }

  ngOnInit() {
    console.log(this.produto);
  }
  getDiscount(){
    return ((this.produto.preco) - (this.produto.preco) * parseInt(this.promocao.valor_porcentagem)  / 100).toFixed(2);
  }

  adicionarCarrinho(){
    let addProduto: Produto[] = [];
    addProduto = JSON.parse(localStorage.getItem("carrinho")) || [];
    addProduto.push(this.produto);
    console.log("produto" + addProduto);
    localStorage.setItem("carrinho", JSON.stringify(addProduto));
  }
  goToProductPage(){
    this.route.navigate(["ver-produto" , this.produto.key]);
  }

}
