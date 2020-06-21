import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { Router } from '@angular/router';
import { CadastroService } from './paginas/cadastro/service/cadastro.service';
import { UsuarioService } from './usuario/usuario.service';
import { Component, SimpleChanges } from '@angular/core';
import { Usuario } from './usuario/model/usuarioModel';

import { faBars, faSearch, faTshirt, faUser, faSignOutAlt, faShoppingBag, faCartPlus,
   faTools, faCreditCard, faTruck, faShieldAlt, faPlusCircle, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { PesquisarService } from './shared/pesquisar/service/pesquisar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  })
export class AppComponent {
  title = 'Sigo';
  estaLogado: boolean = true;
  showingButtons: boolean = false;
  usuarioAtual:Usuario;
  menu_icon = faBars;
  search = faSearch;
  shirt = faTshirt;
  signIn = faUser;
  signOut = faSignOutAlt;
  bag = faShoppingBag;
  buyCart = faCartPlus;
  tools = faTools;
  isMenuCollapsed:boolean = true;
  creditCard = faCreditCard;
  truck = faTruck;
  shieldAlt = faShieldAlt;
  tenis = faShoePrints;
  isSearchCollapsed:boolean = true;
  events: string[] = [];
  opened: boolean;

  pesquisarProdutos;
  startAt = new Subject();
  endAt = new Subject();
  show_list:boolean;
  plus_circle = faPlusCircle;
  

  constructor(private usuarioService:UsuarioService, private cadastroService:CadastroService, private router:Router, private pesquisarService: PesquisarService){
    this.EstaLogado();
  }
  ngOnInit(): void {
    this.show_list = window.innerWidth > 425;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.EstaLogado();
      }
    });

    this.carrinho();
  }
  animationFineshed(event){
   // alert(event);
  }

  EstaLogado(){
    this.usuarioAtual = new Usuario(this.usuarioService.UsuarioLogado());
    if(this.usuarioAtual.uid){
      this.estaLogado = true;
    }else{
      this.estaLogado = false;
    }
  }
  Deslogar(){
    this.cadastroService.DestroyAuth();
    this.usuarioService.DeletarLocal();
    this.EstaLogado();
    this.opened = false;
  }
  toogleButtons(){
    this.showingButtons = !this.showingButtons;
  }
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      imgUrl: '../assets/fab/whatsapp.svg'
    },
    {
      id: 2,
      imgUrl: '../assets/fab/instagram.svg'
    }
  ];
  clicked(value){
    if(value == 1){
      window.open('https://wa.me/5511959006519');
    }
    if(value == 2){
      window.open('https://www.instagram.com/sigosupply/?hl=pt-br');
    }
  }

  pesquisar($event){
    let q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q+"\uf8ff");
    /*this.pesquisarService.getProdutos(this.startAt.toString(), this.endAt.toString()).subscribe(res => {
      this.pesquisarProdutos = res;
      console.log(res)
    })*/
  }

  carrinho(){
    let contador = JSON.parse(localStorage.getItem("carrinho"));
    return contador.length;
  }

}
