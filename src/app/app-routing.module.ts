
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenisComponent } from './paginas/tenis/tenis.component';
import { ShortsComponent } from './paginas/shorts/shorts.component';
import { ContatoComponent } from './paginas/contato/contato.component';
import { CamisetasComponent } from './paginas/camisetas/camisetas.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { LoginComponent } from './paginas/login/login.component';
import { MenuComponent } from './paginas/menu/menu.component';

const routes: Routes = [
  {path: 'cadastro', component: CadastroComponent},
  {path: 'camisetas', component: CamisetasComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shorts', component: ShortsComponent},
  {path: 'tenis', component: TenisComponent},
  {path: '', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
