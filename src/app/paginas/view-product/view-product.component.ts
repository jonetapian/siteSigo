import { Produto } from 'src/app/produtos/model/produtoModel';
import { SizedProduct } from './../../produtos/model/sizedProduct';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product_key:string;
  product: SizedProduct = new SizedProduct();
  produtos_carrinho:Array<Produto> = new Array<Produto>();
  size:string = "default";
  button_string:string = "Adicionar o carrinho";
  show_alert:boolean = false;
  constructor(private active_route:ActivatedRoute, private produto_service:ProdutosService,private route:Router) { }

  ngOnInit() {
    this.active_route.params.subscribe((params:Params) =>{
      console.log(params)
      this.product_key = params['key'];
      this.getProduct();
      this.getCarrinhoProducts();
      this.checkIfIsInCarrinho();
    });
  }
  getProduct(){
    this.produto_service.buscarPorid(this.product_key).then(res =>{
      this.product.fromJson(res);
      console.log(this.product.selected_size);

    });
  }

  getCarrinhoProducts(){
    if(JSON.parse(localStorage.getItem("carrinho"))){
      this.produtos_carrinho = JSON.parse(localStorage.getItem("carrinho"));
    }
    console.log(this.produtos_carrinho);
  }
  checkIfIsInCarrinho(){
    if(!this.produtos_carrinho){
      return false;
    }
    for(let produto of this.produtos_carrinho){
      if(produto.key == this.product_key){
        this.button_string = "Finalizar Compra"
        return true;
      }
    }
    return false;
  }
  adicionarCarrinho(){
    this.produtos_carrinho.push(this.product);
    localStorage.setItem("carrinho", JSON.stringify(this.produtos_carrinho));
  }
  buttonClicked(){
    if(!this.checkIfIsInCarrinho()){
      this.button_string = "Finalizar Compra";
      if(this.product.selected_size){
        this.adicionarCarrinho();
        this.route.navigate(['carrinho']);
      }else{
        this.show_alert = true;
      }

    }else{
      this.route.navigate(['carrinho']);
    }
  }
}
