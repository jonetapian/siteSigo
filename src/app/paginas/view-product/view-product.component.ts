import { SizedProduct } from './../../produtos/model/sizedProduct';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { Produto } from './../../produtos/model/produtoModel';
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
  produtos_carrinho:Array<Produto>;
  size:string = "default";
  button_string:string = "Adicionar o carrinho";
  produtosRelacionados: Produto[] = new Array();
  tipos: string[] = [];
  filtrarTipos;

  constructor(private active_route:ActivatedRoute, private produto_service:ProdutosService,private route:Router) { }

  ngOnInit() {
    this.active_route.params.subscribe((params:Params) =>{
      this.product_key = params['key'];
      this.getProduct();
      this.getCarrinhoProducts();
      this.checkIfIsInCarrinho();
      this.buscarProdutosRelacionados();

    });
    const par = this.active_route.snapshot.paramMap.get('key');
  }
  getProduct(){
    this.produto_service.buscarPorid(this.product_key).then(res =>{
      this.product.fromJson(res);
      
      console.log(this.product.selected_size);
      
    });

  }

  getCarrinhoProducts(){
    this.produtos_carrinho = JSON.parse(localStorage.getItem("carrinho"));
  }
  checkIfIsInCarrinho(){
    if(this.produtos_carrinho){
      for(let produto of this.produtos_carrinho){
        if(produto.key == this.product_key){
          this.button_string = "Finalizar Compra"
          return true;
        }
      }
    }

    return false;
  }
  adicionarCarrinho(){
    if(!this.produtos_carrinho){
      this.produtos_carrinho = new Array();
    }
    this.produtos_carrinho.push(this.product);
    localStorage.setItem("carrinho", JSON.stringify(this.produtos_carrinho));
  }
  buttonClicked(){
    if(!this.checkIfIsInCarrinho()){
      this.button_string = "Finalizar Compra";
      this.adicionarCarrinho();
    }
    this.route.navigate(['carrinho']);
  }

  buscarProdutosRelacionados(){
    
    this.produto_service.buscarRelacionados().subscribe(res => {
      this.produtosRelacionados = res;
    });

  }

  produtos(){
    
    let produtos = [];
    
    for(let produto of this.produtosRelacionados){
      
      if(this.product.tipo[0] == produto.tipo[0] && this.product.key != produto.key){
        produtos.push(produto)
      }

    }
    return produtos;
    
    
  }
}
