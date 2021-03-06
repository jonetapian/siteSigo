import { ToastService } from './../toast/service/toast.service';
import { ProdutosDataService } from './../../produtos/service/produtos-data.service';
import { UsuarioService } from './../../usuario/usuario.service';
import { Usuario } from 'src/app/usuario/model/usuarioModel';
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
  usuarioAtual: Usuario;

  constructor(private route:Router, private usuario: UsuarioService, private produtoDataService: ProdutosDataService, public toastService: ToastService) { }

  ngOnInit() {
    this.usuarioAtual = this.usuario.UsuarioLogado();
  }
  getDiscount(){
    return ((this.produto.preco) - (this.produto.preco) * this.produto.valorPorcentagem  / 100).toFixed(2);
  }

  adicionarCarrinho(){
    let addProduto: Produto[] = [];
    addProduto = JSON.parse(localStorage.getItem("carrinho")) || [];
    addProduto.push(this.produto);
    localStorage.setItem("carrinho", JSON.stringify(addProduto));
  }
  goToProductPage(){
    this.route.navigate(["ver-produto" , this.produto.key]);
  }

  editarProduto(produto, key){
    console.log(produto);
    this.produtoDataService.changeContato(produto, key);
    this.route.navigate(["editar-produto" , this.produto.key]);
  }

  onToast() {
    this.toastService.show('Adicionado ao carrinho!', { classname: 'bg-success text-light', delay: 5000 });
  }

}
