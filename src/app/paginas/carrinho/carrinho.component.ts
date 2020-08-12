import { UsuarioService } from './../../usuario/usuario.service';
import { Frete } from './../finalizar-compra/models/frete-model';
import { Router, ActivatedRoute } from '@angular/router';
import { SizedProduct } from './../../produtos/model/sizedProduct';
import { ProdutosService } from './../../produtos/service/produtos.service';
import { Observable } from 'rxjs';
import { Produto } from './../../produtos/model/produtoModel';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  frete: Frete = new Frete();
  produtos: Produto[];
  listaProdutos: Array<SizedProduct> = [];
  contador = 1;
  produto: string;
  precoTotal: number = 0;
  carrinhoVazio = true;
  show_size_alert:boolean = false;

  constructor(private produtosService: ProdutosService,private router:Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.atualizarCarrinho();
    this.onCarrinhoVazio(this.produtos);
  }

  // receberFrete(frete){
  //   console.log(frete);
  //   this.frete.prazo = Number(frete.PrazoEntrega[0]);
  //   this.frete.preco =  parseFloat(frete.Valor[0]);
  //   this.frete.produtos = this.listaProdutos;
  // }

  increment(produto: Produto){
    produto.quantidadeCarrinho++;
    if(produto.promocao){
      this.precoTotal += ((produto.preco) - ((produto.preco * produto.valorPorcentagem)  / 100));
    }else{
      this.precoTotal += produto.preco * 1;
    }
  }

  decrement(produto: Produto){

    if(produto.quantidadeCarrinho < 2){

    }else{
      produto.quantidadeCarrinho--;
      if(produto.promocao){
        this.precoTotal -= ((produto.preco) - ((produto.preco * produto.valorPorcentagem)  / 100));
      }else{
        this.precoTotal -= produto.preco * 1;
      }
    }
  }

  limparCarrinho(){
    localStorage.clear();
  }

  deletar(produto, index){
    let deletarProduto: Produto[] = [];

    deletarProduto = JSON.parse(localStorage.getItem("carrinho")) || [];

    deletarProduto.splice(index, 1);


    localStorage.setItem("carrinho", JSON.stringify(deletarProduto));
    this.listaProdutos.splice(index, 1);
    if(produto.promocao){
      this.precoTotal -= ((produto.preco) - ((produto.preco * produto.valorPorcentagem)  / 100)) * produto.quantidadeCarrinho;
    }else{
      this.precoTotal -= produto.preco * produto.quantidadeCarrinho;
    }

    this.onCarrinhoVazio(this.listaProdutos);
  }

  atualizarCarrinho(){
    this.produtos = JSON.parse(localStorage.getItem("carrinho"));

    for(let produto of this.produtos){

      produto.quantidadeCarrinho = 1;
      if(produto.promocao){
        this.precoTotal += ((produto.preco) - ((produto.preco * produto.valorPorcentagem)  / 100));
      }else{
        this.precoTotal += produto.preco * 1;
      }



      this.listaProdutos.push(new SizedProduct(produto));


    }



  }

  onCarrinhoVazio(produtos){
    if(produtos.length > 0){
      this.carrinhoVazio = false;
    }else{
      this.carrinhoVazio = true;
    }
  }
  checkIfAllHaveSize(){
    for(let product of this.listaProdutos){
      if(!product.selected_size){
        this.show_size_alert = true;
        return;
      }
    }

    localStorage.setItem("carrinho", JSON.stringify(this.listaProdutos));
    if(this.usuarioService.UsuarioLogado().uid){
      this.router.navigate(['finalizar-compra']);
    }else{

      this.router.navigate(['login', {id: "carrinho"}]);

    }
  }

  UpdateCarrinho(produto, index){
    this.listaProdutos[index] = produto;

    localStorage.setItem("carrinho", JSON.stringify(this.listaProdutos));
    this.show_size_alert = false;
  }
  FinalizarCompra(){

  }

  somarPrecoTotal(){

  }

}
