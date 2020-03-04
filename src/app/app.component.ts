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
  estaLogado: boolean = false;
  showingButtons: boolean = false;
  usuarioAtual:Usuario;
  constructor(private usuarioService:UsuarioService, private cadastroService:CadastroService, private router:Router){
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
