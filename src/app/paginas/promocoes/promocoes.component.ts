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
  all_promotions:Array<Promocao> = new Array<Promocao>();
  constructor(private produto_service:ProdutosService,private promocoes_service:PromocoesService) { }

  ngOnInit() {
    this.produto_service.buscar().subscribe((res:any) =>{
      this.produtos = res;
      console.log(res);
    });
    this.getPromotions();
  }
  showInput(){
    this.show_input = !this.show_input;
    this.new_promotion = new Promocao();
  }

  makePromotion(){
    this.promocoes_service.createPromotion(this.new_promotion).then(res =>{
      alert("Sua promoção foi criada");
    });
  }
  getKey(index){
    let check_index = this.new_promotion.produtos.indexOf(this.produtos[index].key);
    console.log(check_index)

    if(check_index === -1){
      this.new_promotion.produtos.push(this.produtos[index].key);
    }else{
      this.new_promotion.produtos.splice(check_index,1);
    }
    console.log(this.new_promotion.produtos)
  }

  getPromotions(){
    this.promocoes_service.getAllPromotions().subscribe((res:any)=>{
      this.all_promotions = res;
      console.log(res);
    });
  }
  getProductName(key){
    for(let product of this.produtos){
      if(product.key == key){
        return product.nome;
      }
    }
  }
  deletePromotion(index){
    this.promocoes_service.deletePromotion(this.all_promotions[index]);
      this.all_promotions.splice(index,1);
  }
  updatePromotion(index){
    this.new_promotion = new Promocao(this.all_promotions[index]);
    this.show_input = true;
  }
  isChecked(key){
    if(this.new_promotion.produtos.length >0){
      for(let product_key of this.new_promotion.produtos){
        if(product_key === key){
          return true;
        }
      }
    }else{
      return false
    }
  }
}
