import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { Router } from '@angular/router';
import { CadastroService } from './paginas/cadastro/service/cadastro.service';
import { UsuarioService } from './usuario/usuario.service';
import { Component, SimpleChanges } from '@angular/core';
import { Usuario } from './usuario/model/usuarioModel';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  // ...
} from '@angular/animations';
import { faBars, faSearch, faTshirt, faUser, faSignOutAlt, faShoppingBag, faCartPlus, faTools, faCreditCard, faTruck, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { PesquisarService } from './shared/pesquisar/service/pesquisar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger('openClose', [
  //     // ...
  //     state('open', style({
  //       width: 'auto',
  //       border: '30px',
  //       background:'red'

  //     })),
  //     state('closed', style({
  //       width: 'auto',
  //     })),
  //     transition('open => closed', [
  //       animate('3s', style({background:"black"}))
  //     ]),
  //     transition('closed => open', [
  //       animate('0.5s')
  //     ]),
  //   ]),
  //   trigger('rotate', [
  //     state('non', style({ transform: 'rotate(0)' })),
  //     state('rotated', style({ transform: 'rotate(-360deg)' })),
  //     transition('rotated => non', [
  //       animate('2000ms ease-out'),
  //       stagger(-30, [
  //         animate('500ms ', style({ background: }))
  //       ])
  //     ]),
  //     transition('non => rotated', animate('2000ms ease-in'))
  //   ]),
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
  isSearchCollapsed:boolean = true;
  events: string[] = [];
  opened: boolean;

  pesquisarProdutos;
  startAt = new Subject();
  endAt = new Subject();


  constructor(private usuarioService:UsuarioService, private cadastroService:CadastroService, private router:Router, private pesquisarService: PesquisarService){
    this.EstaLogado();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.EstaLogado();
        console.log("sdadsa")
      }
    });

    /*this.pesquisarService.getProdutos(this.startAt.toString(), this.endAt.toString()).subscribe(res => {
      this.pesquisarProdutos = res;
    })*/
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
    console.log(value);
    if(value == 1){
      window.open('https://wa.me/5511959006519');
    }
    if(value == 2){
      window.open('https://www.instagram.com/sigo.style/?hl=pt-br');
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

}
