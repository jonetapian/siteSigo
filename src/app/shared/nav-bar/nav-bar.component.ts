import { Router } from '@angular/router';
import { CadastroService } from './../../paginas/cadastro/service/cadastro.service';
import { UsuarioService } from './../../usuario/usuario.service';
import { Usuario } from 'src/app/usuario/model/usuarioModel';
import { faBars,faSearch, faTshirt,faSignInAlt,faShoppingBag,faUser,faSignOutAlt, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
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
  isMenuCollapsed:boolean = true;
  events: string[] = [];
  opened: boolean;

  constructor(private usuarioService:UsuarioService, private cadastroService:CadastroService
    , private router:Router){
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
}
