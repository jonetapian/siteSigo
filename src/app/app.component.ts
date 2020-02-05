import { CadastroService } from './paginas/cadastro/service/cadastro.service';
import { UsuarioService } from './usuario/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from './usuario/model/usuarioModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sigo';
  estaLogado: boolean = false;
  usuarioAtual:Usuario;
  constructor(private usuarioService:UsuarioService, private cadastroService:CadastroService){
    this.EstaLogado();
  }

  EstaLogado(){
    this.usuarioAtual = new Usuario(this.usuarioService.UsuarioLogado());
    if(this.usuarioAtual.uid){
      this.estaLogado = true;
    }
  }
  Deslogar(){
    this.cadastroService.DestroyAuth();
    this.usuarioService.DeletarLocal();
  }
}
