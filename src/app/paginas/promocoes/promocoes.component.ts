import { PromocoesService } from './service/promocoes.service';
import { Produto } from './../../produtos/model/produtoModel';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { Promocao } from './model/promocoes_model';

@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.css']
})
export class PromocoesComponent implements OnInit {

  show_input:boolean = false;
  produtos:Array<Produto> = new Array<Produto>();
  new_promotion:Promocao = new Promocao;
  constructor(private produto_service:ProdutosService,private promocoes_service:PromocoesService) { }

  ngOnInit() {
    this.produto_service.buscar().subscribe((res:any) =>{
      this.produtos = res;
    });
  }
  showInput(){
    this.show_input = !this.show_input;
  }

  makePromotion(){
    this.promocoes_service.createPromotion(this.new_promotion).then(res =>{
      alert("Sua promoção foi criada");
    });
  }
  getKey(index){
    let check_index = this.new_promotion.produtos.indexOf(this.produtos[index].key);
    if(check_index === -1){
      this.new_promotion.produtos.push(this.produtos[index].key);
    }else{
      this.new_promotion.produtos.splice(check_index,1);
    }
    console.log(this.new_promotion.produtos)
  }

}
