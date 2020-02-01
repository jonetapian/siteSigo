import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './paginas/login/login.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { CamisetasComponent } from './paginas/camisetas/camisetas.component';
import { ShortsComponent } from './paginas/shorts/shorts.component';
import { TenisComponent } from './paginas/tenis/tenis.component';
import { ContatoComponent } from './paginas/contato/contato.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './paginas/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    CamisetasComponent,
    ShortsComponent,
    TenisComponent,
    ContatoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
