import { ConfiguracoesService } from './service/configuracoes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from './../../usuario/usuario.service';
import { Usuario } from './../../usuario/model/usuarioModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  usuario: Usuario;
  novoEmail;

  constructor(private usuarioService: UsuarioService, private configuracoesService: ConfiguracoesService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.UsuarioLogado();
    console.log(this.usuario);

    
  }


  onEditar(a){
    console.log(a);
    a.hidden = !a.hidden;
  }

  atualizarEmail(){
    this.configuracoesService.atualizarEmail(this.usuario, this.usuario.uid);
  }

  atualizarNome(){
    this.configuracoesService.atualizarNome(this.usuario, this.usuario.uid);
  }

  atualizarSenha(){
    this.configuracoesService.atualizarSenha();
  }

}
