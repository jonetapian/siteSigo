import { PromocoesService } from './paginas/promocoes/service/promocoes.service';
import { TagService } from './paginas/tags/service/tag.service';
import { LoginService } from './paginas/login/service/login.service';
import { UsuarioService } from './usuario/usuario.service';
import { CadastroService } from './paginas/cadastro/service/cadastro.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';


import { environment } from '../environments/environment';
import { LoginComponent } from './paginas/login/login.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { CamisetasComponent } from './paginas/camisetas/camisetas.component';
import { ShortsComponent } from './paginas/shorts/shorts.component';
import { TenisComponent } from './paginas/tenis/tenis.component';
import { ContatoComponent } from './paginas/contato/contato.component';
import { MenuComponent } from './paginas/menu/menu.component';
import { AdicionarProdutoComponent } from './paginas/adicionar-produto/adicionar-produto.component';
import { DropzoneDirective } from './dropzone/dropzone.directive';
import { UploadTaskComponent } from './paginas/upload-task/upload-task.component';
import { UploadTaskModule } from './paginas/upload-task/upload-task.module';
import { CarrinhoComponent } from './paginas/carrinho/carrinho.component';

import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormAlertComponent } from './shared/form-alert/form-alert.component';
import { BuyCardComponent } from './shared/buy-card/buy-card.component';
import { TagsComponent } from './paginas/tags/tags.component';
import { PromocoesComponent } from './paginas/promocoes/promocoes.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    CamisetasComponent,
    ShortsComponent,
    TenisComponent,
    ContatoComponent,
    MenuComponent,
    AdicionarProdutoComponent,
    DropzoneDirective,
    CarrinhoComponent,
    FormAlertComponent,
    BuyCardComponent,
    TagsComponent,
    PromocoesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    UploadTaskModule,
    AngularFireAuthModule,
    BrowserAnimationsModule

  ],
  providers: [CadastroService,UsuarioService,LoginService,TagService,PromocoesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
